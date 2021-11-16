/**
 * Round a number to two decimals
 *
 * @param number number to format
 * @returns formated number
 */
export const roundTwoDec = (number: number): number =>
  Math.round(number * 100) / 100;
