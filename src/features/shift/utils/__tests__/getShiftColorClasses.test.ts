import { describe, expect, it } from 'vitest'
import { getShiftColorClasses } from '../getShiftColorClasses'

describe('getShiftColorClasses', () => {
  it('ホール + confirmed で bg-blue-500 text-white を返す', () => {
    const result = getShiftColorClasses('confirmed', 'ホール')
    expect(result).toContain('bg-blue-500')
    expect(result).toContain('text-white')
  })

  it('ホール + draft で bg-blue-200 border-blue-400 を返す', () => {
    const result = getShiftColorClasses('draft', 'ホール')
    expect(result).toContain('bg-blue-200')
    expect(result).toContain('text-gray-800')
    expect(result).toContain('border')
    expect(result).toContain('border-blue-400')
  })

  it('positionName が undefined のとき other（slate）系クラスを返す', () => {
    const result = getShiftColorClasses('confirmed', undefined)
    expect(result).toContain('bg-slate-400')
    expect(result).toContain('text-white')
  })

  it('未知のポジション名のとき other（slate）系クラスを返す', () => {
    const result = getShiftColorClasses('confirmed', '不明')
    expect(result).toContain('bg-slate-400')
    expect(result).toContain('text-white')
  })
})
