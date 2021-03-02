import {
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_PAGINATION_SIZE,
  DEFAULT_PAGINATION_SKIP,
} from '../../utils/constants';
import * as paginationUtils from '../../utils/pagination';
import * as filterUtils from '../../utils/filters';
import * as fakesUtils from '../../utils/fakes/fakeitems';
import * as builders from '../../utils/builders';

describe('Suite tests for paginations Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getTake DEFAULT_PAGINATION_SIZE', () => {
    const data = {};

    const take = paginationUtils.getTake(data);
    expect(take).toBe(DEFAULT_PAGINATION_SIZE);
  });

  it('getTake WITH queryParams', () => {
    const data = {
      size: '10',
    };

    const take = paginationUtils.getTake(data);
    expect(take).toBe(10);
  });

  it('getPage DEFAULT_PAGINATION_PAGE', () => {
    const data = {};

    const page = paginationUtils.getPage(data);
    expect(page).toBe(DEFAULT_PAGINATION_PAGE);
  });

  it('getPage WITH queryParams', () => {
    const data = {
      page: '10',
    };

    const page = paginationUtils.getPage(data);
    expect(page).toBe(10);
  });

  it('getSkip WITH DEFAULT_PAGINATION_SKIP', () => {
    const skip = paginationUtils.getSkip(1, 2);
    expect(skip).toBe(DEFAULT_PAGINATION_SKIP);
  });

  it('getSkip WITH queryParams', () => {
    const skip = paginationUtils.getSkip(2, 10);
    expect(skip).toBe(18);
  });

  it('getTotalPages WITH queryParams', () => {
    const totalPages = paginationUtils.getTotalPages(3, 2);
    expect(totalPages).toBe(2);
  });

  it('setListPagination with items', async () => {
    const queryParams = {
      page: 1,
      size: 3,
    };

    const getPageSpy = jest.spyOn(paginationUtils, 'getPage');
    const getTakeSpy = jest.spyOn(paginationUtils, 'getTake');
    const getSkipSpy = jest.spyOn(paginationUtils, 'getSkip');
    const orderBySpy = jest.spyOn(filterUtils, 'sortBy');
    const buildPaginatedGetAllSpy = jest
      .spyOn(builders, 'buildPaginatedGetAll')
      .mockReturnValue(<any>'builder');

    await paginationUtils.setListPagination(fakesUtils.items, queryParams);
    expect(getPageSpy).toBeCalledWith(queryParams);
    expect(getTakeSpy).toBeCalledWith(queryParams);
    expect(getSkipSpy).toBeCalled();
    expect(orderBySpy).toBeCalled();
    expect(buildPaginatedGetAllSpy).toBeCalled();
  });

  it('setListPagination without items', async () => {
    const items: any = [];
    const queryParams = {
      page: 1,
      size: 3,
    };

    const getPageSpy = jest.spyOn(paginationUtils, 'getPage');
    const getTakeSpy = jest.spyOn(paginationUtils, 'getTake');
    const getSkipSpy = jest.spyOn(paginationUtils, 'getSkip');
    const orderBySpy = jest.spyOn(filterUtils, 'sortBy');
    const buildPaginatedGetAllSpy = jest
      .spyOn(builders, 'buildPaginatedGetAll')
      .mockReturnValue(<any>'builder');

    await paginationUtils.setListPagination(items, queryParams);
    expect(getPageSpy).toBeCalledWith(queryParams);
    expect(getTakeSpy).toBeCalledWith(queryParams);
    expect(getSkipSpy).toBeCalled();
    expect(orderBySpy).not.toBeCalled();
    expect(buildPaginatedGetAllSpy).toBeCalled();
  });
});
