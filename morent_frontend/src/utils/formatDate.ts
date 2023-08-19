import format from 'date-fns/format';

export const formatDateValue = (value: string) => {
  return value ? format(+value, 'PPP') : 'Pick a date';
};
