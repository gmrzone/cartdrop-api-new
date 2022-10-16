// eslint-disable-next-line @typescript-eslint/no-var-requires
const url = require('url');

// TODO : This pagination class is incomplete:

export interface IPAGINATED_RESPONSE<T> {
  previousPage: string | null;
  nextPage: string | null;
  items: T[];
}

export interface IPAGINATION_SERVICE {
  getPaginateParams: (cursor: string | undefined) => {
    condition: string | undefined;
    orderBy: string;
    limit: string;
    position: string | undefined;
    isReversed: boolean;
  };
  parseOrdering: (isReverse: boolean) => {
    order: string;
    orderFieldName: string;
  };
  getCondition: (isReverse: boolean) => string;
  encodeCursor: (cursorId: string, reverse: boolean) => string;
  decodeCursor: (cursor: string) => {
    reverse?: number;
    position: string;
  };
  buildSQL: (
    baseSQL: string,
    condition: string | undefined,
    orderBy: string,
    limit: string,
    isReversed: boolean,
    groupBy?: boolean,
  ) => string;
  getPaginatedResponse: <T extends { id: string }>(
    items: T[],
    rowCount: number,
    baseUrl: string,
    reverse: boolean,
    isCursorAvailable: boolean,
  ) => IPAGINATED_RESPONSE<T>;
  getNextLink: <T extends { id: string }>(
    items: T[],
    rowCount: number,
    baseUrl: string,
    reverse: boolean,
  ) => string | null;
  getPreviousLink: <T extends { id: string }>(
    items: T[],
    rowCount: number,
    baseUrl: string,
    reverse: boolean,
    isCursorAvailable: boolean,
  ) => string | null;
  setPageSize: (size: number) => void;
}
export class PaginationService implements IPAGINATION_SERVICE {
  private _pageSize: number;
  private _maxSize: number;
  private _ordering: string;

  constructor(pageSize: number, maxSize: number, ordering: string) {
    this._pageSize = pageSize;
    this._maxSize = maxSize;
    this._ordering = ordering;
  }
  // Modify page size
  setPageSize = (size: number) => {
    this._pageSize = size;
  };
  // this method is used to get all pagination params for SQL eg, condition, orderby, limit
  // and it also return decoded cursor
  getPaginateParams = (cursor: string | undefined) => {
    // if cursor is there then decode it else set to null
    // if cursor is not there which means we are fetching first page so no need to add condition
    // if cursor is there then we have to check if cursor is a reverse cursor
    // if it is a reverse cursor then ordering will be DESC else ASC
    // also if its a reverse cursor then condition will have < operator else > operator
    const cursorObj = cursor ? this.decodeCursor(cursor) : null;
    const reverse = cursorObj?.reverse;
    const position = cursorObj?.position;
    const isReversed = Boolean(reverse);
    const { order, orderFieldName } = this.parseOrdering(isReversed);
    const condition = position ? this.getCondition(isReversed) : undefined;
    this._pageSize =
      this._pageSize > this._maxSize ? this._maxSize : this._pageSize;
    const orderBy = `ORDER BY ${orderFieldName} ${order}`;
    const limit = `LIMIT ${this._pageSize + 1}`;
    return { condition, orderBy, limit, isReversed, position };
  };

  parseOrdering = (isReverse: boolean) => {
    // TODO : ordering for - functionality will be added later current will only add order by ASC
    const isDescending = this._ordering.startsWith('-');
    let order = isDescending ? 'DESC' : 'ASC';
    order = isReverse ? (order === 'DESC' ? 'ASC' : 'DESC') : order;
    const orderFieldName = isDescending
      ? this._ordering.slice(1)
      : this._ordering;

    return { order, orderFieldName };
  };

  getCondition = (reverse?: boolean) => {
    // TODO : for condition also will only support order by ASC for now later will add the remaning functionality
    const isDescending = this._ordering.startsWith('-');
    const { orderFieldName } = this.parseOrdering(Boolean(reverse));
    let operator = isDescending ? '<' : '>';
    operator = reverse ? (operator === '<' ? '>' : '<') : operator;

    const condition = `WHERE ${orderFieldName} ${operator} $1`;
    return condition;
  };

  buildSQL = (
    baseSQL: string,
    condition: string | undefined,
    orderBy: string,
    limit: string,
    isReversed: boolean,
    _groupBy = false,
  ) => {
    // This method will take base url, condition, orderBy, limit, isReversed and build a paginated SQL
    // IF isReverse is true then we will use WITH SQL statement to reorder the reverse SQL to proper ordering
    if (condition) {
      baseSQL = baseSQL + ` ${condition}`;
    }
    let SQL = `${baseSQL} ${orderBy} ${limit}`;
    if (isReversed) {
      const isDescending = this._ordering.startsWith('-');
      const reverseOrderBy = isDescending
        ? orderBy.replace('ASC', 'DESC')
        : orderBy.replace('DESC', 'ASC');
      SQL = `WITH reverse as (${SQL}) SELECT * from reverse ${reverseOrderBy}`;
    }
    return SQL;
  };
  // This method takes cursorId and reverse boolean and create a base64 cursor that
  // we can later decode to get values for cursorId and reverse
  encodeCursor = (cursorId: string, reverse: boolean) => {
    // create a object with reverse and position, if reverse is there then only we add it
    const queryParams = {
      ...(reverse && { r: 1 }),
      p: cursorId,
    };
    // convert it to searchParam and then to string then create a buffer and convert to base64
    const queryString = new url.URLSearchParams(queryParams).toString();
    const cursorBuffer = Buffer.from(queryString, 'utf-8');
    const base64Cursor = cursorBuffer.toString('base64');
    return base64Cursor;
  };

  // This method takes a cursor and returns the reverse and position value
  decodeCursor: (cursor: string) => { reverse?: number; position: string } = (
    cursor: string,
  ) => {
    // create a buffer form base64 cursor then convert to string
    // then convert to url search params ane get the calue for position and reverse
    const cursorBuffer = Buffer.from(cursor, 'base64');
    const cursorDecoded = cursorBuffer.toString('utf-8');
    const queryData = new url.URLSearchParams(cursorDecoded);
    const reverse: string = queryData.get('r');
    const position: string = queryData.get('p');

    return {
      ...(reverse && { reverse: +reverse }),
      position,
    };
  };
  // this method should be called After SQL is executed. It takes items, rowCOunt, reqUrl, reverse and isCursorAvailable
  // and return a paginated response with nextPageLink and previousPageLink
  getPaginatedResponse = <T extends { id: string }>(
    items: T[],
    rowCount: number,
    baseUrl: string,
    reverse: boolean,
    isCursorAvailable: boolean,
  ): { nextPage: string | null; previousPage: string | null; items: T[] } => {
    // If rowCount is 1+ then the pageSize then we know that nextPage is available
    // and if we are in reverse mode then we know that the previous page is available'
    // we remove the extra item and pass it to getNextPage and getPreviousPage to get the link
    let updatedItems;
    if (rowCount === this._pageSize + 1) {
      updatedItems = reverse ? items.slice(1) : items.slice(0, -1);
    } else {
      updatedItems = items;
    }

    const nextPage = this.getNextLink(updatedItems, rowCount, baseUrl, reverse);
    const previousPage = this.getPreviousLink(
      updatedItems,
      rowCount,
      baseUrl,
      reverse,
      isCursorAvailable,
    );
    return {
      previousPage,
      nextPage,
      items: updatedItems,
    };
  };
  // This method is used to get the previousPageLink if available else null
  getPreviousLink = <T extends { id: string }>(
    items: T[],
    rowCount: number,
    baseUrl: string,
    reverse: boolean,
    isCursorAvailable: boolean,
  ) => {
    // if cursor is not available that means we are on first page and no previous page is available
    // if we are not in reverse mode then we know there is a previous page
    // if we are in reverse mode and rowCount return from SQL is 1+ page size then we have a previous page
    // if any of the condition is true then we have to send a cursor for previous page else send null
    // if its true then for previous page we will use first item id as cursorPosition
    // and for the nextPageLink we will use lastItem id. in SQL we will use < or > to get the previous page or next page
    // we encode the cursor and add it to request url
    if (
      isCursorAvailable &&
      (!reverse || (reverse && rowCount === this._pageSize + 1))
    ) {
      const newCursorPosition = items[0].id;
      console.log('previousId', newCursorPosition);
      const encodedCursor = this.encodeCursor(newCursorPosition, true);
      const parsedBaseUrl = new URL(baseUrl);
      parsedBaseUrl.search = new url.URLSearchParams(
        `pageSize=${this._pageSize}&cursor=${encodedCursor}`,
      );
      return parsedBaseUrl.href;
    }

    return null;
  };
  // This method is used to get the nextPageLink if available else null
  getNextLink = <T extends { id: string }>(
    items: T[],
    rowCount: number,
    baseUrl: string,
    reverse: boolean,
  ) => {
    // if we get pageSize + 1 data from SQL that means we have next page
    // or if we are in reverse then it means there is a next page
    // for nextPAge Cursor position we use last item id and encode it to base64 and
    // add it to the request url
    if (rowCount === this._pageSize + 1 || reverse) {
      const newCursorPosition = items[items.length - 1].id;
      console.log('nextId', newCursorPosition);
      const encodedCursor = this.encodeCursor(newCursorPosition, false);
      const parsedBaseUrl = new URL(baseUrl);
      parsedBaseUrl.search = new url.URLSearchParams(
        `pageSize=${this._pageSize}&cursor=${encodedCursor}`,
      );
      return parsedBaseUrl.href;
    }
    return null;
  };
}

/*
example with pageSize of 5

# Get First page, if cursor is not there then fetch the data with limit as pageSize + 1

SELECT id, uuid, name, slug, photo, placeholder
	FROM public.brands ORDER BY id ASC limit 6;

// query response of first page will have 6 rows. 
//if 6th row is there then it means we have next page
// we will return first five row as response and fifth row id will be next_page cursor
// we are on first page so previous_page will be null

// When getting secong page we will have id 5 as cursor so we will 
// fetch next 5 item by ading a where clause and limit
// again we will fetch limit + 1 so we know if next page is there or not
// and since we are going to next page we know that there will be previous page
// we will use first row id for previous_cursor
SELECT id, uuid, name, slug, photo, placeholder
	FROM public.brands WHERE id > 5 ORDER BY id ASC limit 6;


SELECT id, uuid, name, slug, photo, placeholder
	FROM public.brands WHERE id > 10 ORDER BY id ASC limit 6;
	
SELECT id, uuid, name, slug, photo, placeholder
	FROM public.brands WHERE id > 15 ORDER BY id ASC limit 6;


with this_set as (SELECT id, uuid, name, slug, photo, placeholder
	FROM public.brands WHERE id < 16 ORDER BY id DESC limit 6) select * from this_set order by id asc;


with this_set as (SELECT id, uuid, name, slug, photo, placeholder
	FROM public.brands WHERE id < 11 ORDER BY id DESC limit 6) select * from this_set order by id asc;

with this_set as (SELECT id, uuid, name, slug, photo, placeholder
	FROM public.brands WHERE id < 6 ORDER BY id DESC limit 6) select * from this_set order by id asc;



*/
