import { PaginatedGetAllInterface } from '../interfaces/paginatedgetallinterface';
import { buildPaginatedGetAll } from './builders';
import {
  DEFAULT_PAGINATION_SIZE,
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_PAGINATION_SKIP,
} from './constants';
import { sortBy } from './filters';

export const setListPagination = (
  data: any[] | undefined,
  queryParams?: Record<string, unknown>,
): PaginatedGetAllInterface => {
  const take = getTake(queryParams);
  const page = getPage(queryParams);
  const skip = getSkip(take, page);

  return buildPaginatedGetAll(
    {
      items:
        data !== undefined && data.length > 0
          ? sortBy(data.slice(skip, skip + take), queryParams)
          : [],
      count: data !== undefined && data.length ? data.length : 0,
    },
    queryParams,
  );
};

export const getTake = (queryParams?: Record<string, unknown>): number => {
  const size =
    queryParams !== undefined && !!queryParams.size
      ? queryParams.size
      : DEFAULT_PAGINATION_SIZE;
  return Number(size);
};

export const getPage = (queryParams?: Record<string, unknown>): number => {
  const page =
    queryParams !== undefined && queryParams.page
      ? queryParams.page
      : DEFAULT_PAGINATION_PAGE;
  return Number(page);
};

export const getSkip = (take: number, page: number): number => {
  const skip = take * (page - 1);
  return skip === 1 ? DEFAULT_PAGINATION_SKIP : skip;
};

export const getTotalPages = (count: number, limit: number): number => {
  const numberPages = count / limit;

  if (Number.isInteger(numberPages)) return numberPages;

  return Math.trunc(1 + numberPages);
};
