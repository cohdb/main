import { PENDING_STATUS, FULFILLED_STATUS, REJECTED_STATUS } from './constants';

export const isPending = status => status.name === PENDING_STATUS;

export const isFulfilled = status => status.name === FULFILLED_STATUS;

export const isRejected = status => status.name === REJECTED_STATUS;

export const allFulfilled = (...statuses) => {
  if (statuses.length === 0) {
    return { name: FULFILLED_STATUS };
  }

  if (statuses.every(status => status.name === FULFILLED_STATUS)) {
    return { name: FULFILLED_STATUS };
  }

  if (statuses.some(status => status.name === REJECTED_STATUS)) {
    return { name: REJECTED_STATUS };
  }

  return { name: PENDING_STATUS };
};
