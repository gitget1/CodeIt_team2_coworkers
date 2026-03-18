import { ApiError } from './apiError';

export type Success<T> = {
  ok: true;
  data: T;
};

export type Failure = {
  ok: false;
  error: ApiError;
};

export type Result<T> = Success<T> | Failure;
