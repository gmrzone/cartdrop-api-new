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
    condition: string;
    orderBy: string;
    limit: string;
    position: string;
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
    condition: string,
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
  setPageSize = (size: number) => {
    this._pageSize = size;
  };
  getPaginateParams = (cursor: string | undefined) => {
    const cursorObj = cursor
      ? this.decodeCursor(cursor)
      : { reverse: 0, position: '0' };
    const { reverse, position } = cursorObj;
    const isReversed = Boolean(reverse);
    const { order, orderFieldName } = this.parseOrdering(isReversed);
    const condition = this.getCondition(isReversed);
    const pageSizeLimit =
      this._pageSize > this._maxSize ? this._maxSize : this._pageSize;
    const orderBy = `ORDER BY ${orderFieldName} ${order}`;
    const limit = `LIMIT ${pageSizeLimit + 1}`;
    return { condition, orderBy, limit, isReversed, position };
  };

  parseOrdering = (isReverse: boolean) => {
    // ordering for - functionality will be added later current will only add order by ASC
    const isDescending = this._ordering.startsWith('-');
    const order = isReverse ? 'DESC' : 'ASC';
    const orderFieldName = isDescending
      ? this._ordering.slice(1)
      : this._ordering;

    return { order, orderFieldName };
  };

  getCondition = (reverse?: boolean) => {
    // for condition also will only support order by ASC for now later will add the remaning functionality
    const { order: __, orderFieldName } = this.parseOrdering(Boolean(reverse));
    const condition = `WHERE ${orderFieldName} ${reverse ? '<' : '>'} $1`;
    return condition;
  };

  buildSQL = (
    baseSQL: string,
    condition: string,
    orderBy: string,
    limit: string,
    isReversed: boolean,
    _groupBy = false,
  ) => {
    let SQL = `${baseSQL} ${condition} ${orderBy} ${limit}`;
    if (isReversed) {
      const reverseOrderBy = orderBy.replace('DESC', 'ASC');
      SQL = `WITH reverse as (${SQL}) SELECT * from reverse ${reverseOrderBy}`;
    }
    return SQL;
  };
  encodeCursor = (cursorId: string, reverse: boolean) => {
    const queryParams = {
      ...(reverse && { r: 1 }),
      p: cursorId,
    };
    const queryString = new url.URLSearchParams(queryParams).toString();
    const cursorBuffer = Buffer.from(queryString, 'utf-8');
    const base64Cursor = cursorBuffer.toString('base64');
    return base64Cursor;
  };

  decodeCursor: (cursor: string) => { reverse?: number; position: string } = (
    cursor: string,
  ) => {
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
  getPaginatedResponse = <T extends { id: string }>(
    items: T[],
    rowCount: number,
    baseUrl: string,
    reverse: boolean,
    isCursorAvailable: boolean,
  ): { nextPage: string | null; previousPage: string | null; items: T[] } => {
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

  // TODO: remove newCursorPosition and directly pass the list of data
  // Also create a generic for type
  getPreviousLink = <T extends { id: string }>(
    items: T[],
    rowCount: number,
    baseUrl: string,
    reverse: boolean,
    isCursorAvailable: boolean,
  ) => {
    if (
      isCursorAvailable &&
      (!reverse || (reverse && rowCount === this._pageSize + 1))
    ) {
      const newCursorPosition = items[0].id;
      const encodedCursor = this.encodeCursor(newCursorPosition, true);
      const parsedBaseUrl = new URL(baseUrl);
      parsedBaseUrl.search = new url.URLSearchParams(
        `pageSize=${this._pageSize}&cursor=${encodedCursor}`,
      );
      return parsedBaseUrl.href;
    }

    return null;
  };

  getNextLink = <T extends { id: string }>(
    items: T[],
    rowCount: number,
    baseUrl: string,
    reverse: boolean,
  ) => {
    if (rowCount === this._pageSize + 1 || reverse) {
      const newCursorPosition = items[items.length - 1].id;
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
