import { it, expect, describe } from 'vitest'
import { formatMoney } from './money'

describe('formatmoney function', () => {
  it('format 1450 cents as $14.50', () => {
    expect(formatMoney(1450)).toBe('$14.50')
    expect(formatMoney(100)).toBe('$1.00')
  })

  it('it displays 2 decimals', () => {
    expect(formatMoney(1560)).toBe('$15.60')
    expect(formatMoney(100)).toBe('$1.00')
  })
})