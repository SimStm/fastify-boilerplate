import { isEmpty } from 'lodash'

export const useSuggestedValueIfEmpty = (
  value: string,
  suggestedValue: string
) => (!isEmpty(value) ? value : suggestedValue)
