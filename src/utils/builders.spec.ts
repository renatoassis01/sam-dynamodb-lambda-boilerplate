import { HttpStatusCode } from './http';
import * as fakeItems from './fakes/fakeitems';
import * as builders from './builders';

describe('Suite tests for builders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('buildResponse', () => {
    const response = builders.buildResponse(
      HttpStatusCode.OK,
      fakeItems.items[0],
    );
    expect(response.body).toEqual(JSON.stringify(fakeItems.items[0]));
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  it('buildPaginatedGetAll', () => {
    const items = fakeItems.items;
    const data = { items: items, count: items.length };

    const queryParams = {
      page: 1,
      size: 3,
    };

    const response = builders.buildPaginatedGetAll(data, queryParams);
    expect(response.count).toBe(items.length);
    expect(response.data.length).toBe(items.length);
    expect(response.limit).toBe(queryParams.size);
    expect(response.totalPages).toBe(items.length / queryParams.size);
  });
});
