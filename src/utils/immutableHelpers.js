export const isDefined = val => val !== null && val !== undefined && !Number.isNaN(val);

export const sort = (collection, sortBy) => collection.sortBy(item => item[sortBy]);
