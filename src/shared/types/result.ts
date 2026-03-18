import { ApiError } from './apiError';

export type Success<T> = {
  ok: true;
  data: T;
};

export type Failure<E = ApiError> = {
  ok: false;
  error: E;
};

export type Result<T, E = ApiError> = Success<T> | Failure<E>;
