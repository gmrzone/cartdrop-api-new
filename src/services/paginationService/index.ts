// eslint-disable-next-line @typescript-eslint/no-var-requires
const url = require('url');

// TODO : This pagination class is incomplete:
export interface IPAGINATE_QUERY_OPTIONS {
  sql: string;
  baseUrl: string;
  cursor: string;
  ordering: string[];
}

export interface IPAGINATION_SERVICE {
  decodeCursor: (cursor: string) => {
    reverse?: string;
    position: string;
  };
}
class PaginationService implements IPAGINATION_SERVICE {
  private _pageSize: number;
  private _maxSize: number;
  private _invalidCursorMessage: string;
  private _ordering: string;
  private _baseUrl: string;

  constructor(pageSize: number, maxSize: number, baseUrl: string) {
    this._pageSize = pageSize;
    this._maxSize = maxSize;
    this._invalidCursorMessage = 'Invalid Cursor';
    this._ordering = 'id';
    this._baseUrl = baseUrl;
  }

  getPaginateParams = (options: IPAGINATE_QUERY_OPTIONS) => {
    const { cursor, ordering } = options;
    const cursorObj = this.decodeCursor(cursor);
    const { reverse, position } = cursorObj;
    const limit = `LIMIT ${this._pageSize}`;
    // const ordering = `ORDER BY ${position} ASC`
    let condition;
    if (position) {
      const order = ordering[0];
      //   const isReversedOrdering = order.startsWith('-');
      const orderingColumnName = order.slice(1);

      condition = reverse
        ? `WHERE ${orderingColumnName} < ${position}`
        : `WHERE ${orderingColumnName} > ${position}`;
    }

    return { condition, limit };
  };
  encodeCursor = (cursorId: number, reverse: boolean) => {
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
}

const a = new PaginationService(10, 12, '');

console.log(a.encodeCursor(10, true));
console.log(a.decodeCursor('cj0xJnA9MTA='));

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
