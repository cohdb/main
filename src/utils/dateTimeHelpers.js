import moment from 'moment';
import numeral from 'numeral';

const TIME_FORMAT = 'HH:mm:ss';

export const formatTicks = ticks => moment.utc((numeral(ticks).value() / 8.0) * 1000.0).format(TIME_FORMAT);

export const formatTimeAgo = (timestamp) => {
  const milliseconds = moment() - moment(timestamp);

  const hours = milliseconds / 1000.0 / 60.0 / 60.0;
  if (hours < 1.0) return 'Just now';
  if (hours < 2.0) return '1 hour ago';
  if (hours < 24.0) return `${numeral(hours).format('0')} hours ago`;

  const days = hours / 24.0;
  if (days < 2.0) return '1 day ago';
  if (days < 30.0) return `${numeral(days).format('0')} days ago`;

  const months = days / 30.0;
  if (months < 2.0) return '1 month ago';
  if (months < 12.0) return `${numeral(months).format('0')} months ago`;

  const years = months / 12.0;
  if (years < 2.0) return '1 year ago';
  return `${numeral(years).format('0')} years ago`;
};
