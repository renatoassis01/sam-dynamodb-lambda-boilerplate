import {
  DEFAULT_QUERY_SORT_ORDER,
  DEFAULT_QUERY_SORT_PARAM,
  allowedSortOrders,
  allowedSortParams,
} from './constants';

import orderBy from 'lodash.orderby';

export const sortBy = (
  data: any[],
  queryParams?: Record<string, unknown>,
): any[] => {
  const sortParam = getSortParam(queryParams);
  const sortOrder = getSortOrder(queryParams);

  return orderBy(
    data,
    [sortParam],
    sortOrder === 'ASC' ? ['asc', 'desc'] : ['desc', 'asc'],
  );
};

export const getSortParam = (queryParams?: Record<string, unknown>): string => {
  const sortParam =
    queryParams !== undefined &&
    !!queryParams.sortParam &&
    allowedSortParams.includes(<string>queryParams.sortParam)
      ? queryParams.sortParam
      : DEFAULT_QUERY_SORT_PARAM;
  return String(sortParam);
};

export const getSortOrder = (queryParams?: Record<string, unknown>): string => {
  const sortOrder =
    queryParams !== undefined &&
    !!queryParams.sortOrder &&
    allowedSortOrders.includes(String(queryParams.sortOrder))
      ? queryParams.sortOrder
      : DEFAULT_QUERY_SORT_ORDER;

  return String(sortOrder).toUpperCase();
};
