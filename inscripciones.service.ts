import { DateTime } from 'luxon';

export const getNowDate = (): Date => {
    return DateTime.now()
        .setZone('America/Bogota')
        .minus({ hours: 5 })
        .toJSDate();
};

/**
 * Formats a JavaScript Date object to a string in 'yyyy-mm-dd' format
 * @param date - The Date object to format
 * @returns A string in 'yyyy-mm-dd' format, or an empty string if date is invalid
 */
export const formatDateToYMD = (): string => {
    const date = DateTime.now()
        .setZone('America/Bogota')
        .minus({ hours: 5 })
        .toJSDate();

    return DateTime.fromJSDate(date).toISODate() || '';
};

export const formatoDateToDDMMYYYY = (): string => {
  return DateTime.now()
    .setZone('America/Bogota')
    .toFormat('yyyyLLdd');
};
