// eslint-disable-next-line @typescript-eslint/no-var-requires
const url = require('url');

// TODO : This pagination class is incomplete:

export interface IPAGINATION_SERVICE {
  decodeCursor: (cursor: string) => {
    reverse?: string;
    position: string;
  };
}
class PaginationService implements IPAGINATION_SERVICE {
  private _pageSize: number;
  private _maxSize: number;
  private _ordering: string;

  constructor(pageSize: number, maxSize: number, ordering: string) {
    this._pageSize = pageSize;
    this._maxSize = maxSize;
    this._ordering = ordering;
  }

  getPaginateParams = (cursor: string) => {
    const cursorObj = this.decodeCursor(cursor);
    const { reverse, position } = cursorObj;
    const { order, orderFieldName } = this.parseOrdering(Boolean(reverse));
    const condition = this.getCondition(position, Boolean(reverse));
    const pageSizeLimit =
      this._pageSize > this._maxSize ? this._maxSize : this._pageSize;
    const orderBY = `ORDER BY ${orderFieldName} ${order}`;
    const limit = `LIMIT ${pageSizeLimit + 1}`;
    return { condition, orderBY, limit };
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

  getCondition = (position: string, reverse?: boolean) => {
    // for condition also will only support order by ASC for now later will add the remaning functionality
    const { order, orderFieldName } = this.parseOrdering(Boolean(reverse));
    const condition = `WHERE ${orderFieldName} ${
      reverse ? 'DESC' : 'ASC'
    } ${position}`;
    return condition;
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

  decodeCursor: (cursor: string) => { reverse?: string; position: string } = (
    cursor: string,
  ) => {
    const cursorBuffer = Buffer.from(cursor, 'base64');
    const cursorDecoded = cursorBuffer.toString('utf-8');
    const queryData = new url.URLSearchParams(cursorDecoded);
    const reverse = queryData.get('r');
    const position = queryData.get('p');

    return {
      ...(reverse && { reverse }),
      position,
    };
  };
  // TODO: remove newCursorPosition and directly pass the list of data
  // Also create a generic for type
  getNextLink = (
    baseUrl: string,
    rowCount: number,
    newCursorPosition: string,
    reverse: boolean,
  ) => {
    if (rowCount === this._pageSize + 1 || reverse) {
      const encodedCursor = this.encodeCursor(newCursorPosition, false);
      const parsedBaseUrl = new URL(baseUrl);
      parsedBaseUrl.search = new url.URLSearchParams(
        `pageSize=${this._pageSize}&cursor=${encodedCursor}`,
      );
      return parsedBaseUrl.href;
    }
    return null;
  };

  // TODO: remove newCursorPosition and directly pass the list of data
  // Also create a generic for type
  getPreviousLink = (
    baseUrl: string,
    rowCount: number,
    newCursorPosition: string,
    reverse: boolean,
    isCursorAvailable: boolean,
  ) => {
    if (
      isCursorAvailable &&
      (!reverse || (reverse && rowCount === this._pageSize + 1))
    ) {
      const encodedCursor = this.encodeCursor(newCursorPosition, true);
      const parsedBaseUrl = new URL(baseUrl);
      parsedBaseUrl.search = new url.URLSearchParams(
        `pageSize=${this._pageSize}&cursor=${encodedCursor}`,
      );
      return parsedBaseUrl.href;
    }

    return null;
  };
}

const a = new PaginationService(5, 12, 'id');

console.log(a.getNextLink('http://localhost:5000/api/brands', 6, '10', false));
console.log(
  a.decodeCursor(new url.URLSearchParams('cursor=cD0xMA%3D%3D').get('cursor')),
);
console.log(
  a.getPreviousLink('http://localhost:5000/api/brands', 6, '11', true, true),
);
console.log(
  a.decodeCursor(
    new url.URLSearchParams('cursor=cj0xJnA9MTE%3D').get('cursor'),
  ),
);
console.log(new url.URLSearchParams('cursor=cj0xJnA9MTE%3D').get('cursor'));
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
