import { APIGatewayProxyResult } from 'aws-lambda';
import { PaginatedGetAllInterface } from '../interfaces/paginatedgetallinterface';
import { HttpStatusCode } from './http';
import { getPage, getTake, getTotalPages } from './pagination';

export const buildResponse = (
  statusCode: HttpStatusCode,
  body?: unknown,
): APIGatewayProxyResult => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
  };
};

export const buildPaginatedGetAll = (
  data: { items: any[]; count: number },
  queryParams?: Record<string, unknown>,
): PaginatedGetAllInterface => {
  const page = getPage(queryParams);
  const limit = getTake(queryParams);
  const totalPages = getTotalPages(data.count, limit);
  return {
    data: data.items,
    count: data.count,
    limit,
    page,
    totalPages,
  };
};
