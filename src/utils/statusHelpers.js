import { PENDING_STATUS, FULFILLED_STATUS, REJECTED_STATUS } from './constants';

export const isFulfilled = status => status === FULFILLED_STATUS;

export const allFulfilled = (...statuses) => {
  if (statuses.length === 0) {
    return FULFILLED_STATUS;
  }

  if (statuses.every(status => status === FULFILLED_STATUS)) {
    return FULFILLED_STATUS;
  }

  if (statuses.some(status => status === REJECTED_STATUS)) {
    return REJECTED_STATUS;
  }

  return PENDING_STATUS;
};
