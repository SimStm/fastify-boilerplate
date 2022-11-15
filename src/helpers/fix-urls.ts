import { isEmpty } from 'lodash';

export const fixHttpsUrl = (originalUrl: string) => {
  if (isEmpty(originalUrl)) return '';

  if (originalUrl.startsWith('//'))
    originalUrl = originalUrl.replace('//', 'https://');

  if (originalUrl.startsWith('http://'))
    originalUrl = originalUrl.replace('http://', 'https://');

  originalUrl = originalUrl.replace('https:https', 'https:');
  originalUrl = originalUrl.replace('https::', 'https:');

  return originalUrl;
};
