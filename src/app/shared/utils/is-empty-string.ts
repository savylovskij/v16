import validator from 'validator';

export function isEmptyString(
  value: unknown,
  ignoreWhitespaces = true,
): boolean {
  if (typeof value !== 'string') {
    return true;
  }

  return validator.isEmpty(value, {
    ignore_whitespace: ignoreWhitespaces,
  });
}
