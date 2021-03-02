import {
  DEFAULT_QUERY_SORT_PARAM,
  DEFAULT_QUERY_SORT_ORDER,
} from '../../utils/constants';
import { getSortOrder, getSortParam, sortBy } from '../../utils/filters';
import * as fakeItems from '../../utils/fakes/fakeitems';

describe('Suite test for filters Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getSortParam with params', () => {
    const data = {
      sortParam: 'name',
    };

    const result = getSortParam(data);
    expect(result).toEqual('name');
  });

  it('getSortParam with default params', () => {
    const data = {
      sortParam: 'unknowProperty',
    };

    const result = getSortParam(data);
    expect(result).toEqual(DEFAULT_QUERY_SORT_PARAM);
  });

  it('getSortOrder with params', () => {
    const data = {
      sortParam: 'asc',
    };

    const result = getSortOrder(data);
    expect(result).toEqual('ASC');
  });

  it('getSortOrder with default params', () => {
    const data = {
      sortParam: 'unknowProperty',
    };

    const result = getSortOrder(data);
    expect(result).toEqual(DEFAULT_QUERY_SORT_ORDER);
  });

  it('sortBy DESC', () => {
    const queryParams = {
      sortParam: 'name',
      sortOrder: 'DESC',
    };

    const result = sortBy(fakeItems.items, queryParams);
    const index = fakeItems.items.length - 1;
    expect(result[0].name).toEqual(fakeItems.items[index].name);
  });

  it('sortBy ASC', () => {
    const queryParams = {
      sortParam: 'name',
      sortOrder: 'ASC',
    };

    const result = sortBy(fakeItems.items, queryParams);
    expect(result[0].name).toEqual(fakeItems.items[0].name);
  });
});
