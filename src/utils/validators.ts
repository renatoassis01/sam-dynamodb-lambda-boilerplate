import { BadRequestException } from './http';

export const validatorBody = (body: string): string => {
  if (!body) throw new BadRequestException('body is required');
  return body;
};

export const validatorName = (name: string): string => {
  if (!name) throw new BadRequestException('name is required');
  return name;
};

export const validatorUserId = (userId: string): string => {
  if (!userId) throw new BadRequestException('userId is required');
  return userId;
};
