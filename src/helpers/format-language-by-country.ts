import { EGeneralLanguage } from '../types/enums';

export const formatLanguageByCountry = (country: string) => {
  switch (country.toLowerCase()) {
    case 'united states':
    case 'united states of america':
    case 'us':
    case 'usa':
    case 'usd':
    default:
      return EGeneralLanguage.en;
    case 'brasil':
    case 'brazil':
    case 'br':
    case 'bra':
    case 'brl':
      return EGeneralLanguage.pt;
    case 'argentina':
    case 'ar':
    case 'arg':
    case 'ars':
      return EGeneralLanguage.es;
  }
};
