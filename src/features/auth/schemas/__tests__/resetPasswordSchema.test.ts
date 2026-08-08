import { describe, it, expect } from 'vitest'
import { resetPasswordSchema } from '../resetPasswordSchema'

const validInput = {
  password: 'password123',
  password_confirmation: 'password123',
}

describe('resetPasswordSchema', () => {
  it('正常な入力でバリデーション通過する', () => {
    const result = resetPasswordSchema.safeParse(validInput)
    expect(result.success).toBe(true)
  })

  it('パスワードが8文字未満の場合エラーになる', () => {
    const result = resetPasswordSchema.safeParse({ password: '1234567', password_confirmation: '1234567' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('パスワードは8文字以上で入力してください')
  })

  it('パスワード確認が一致しない場合エラーになる', () => {
    const result = resetPasswordSchema.safeParse({ ...validInput, password_confirmation: 'different123' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('パスワードが一致しません')
  })
})
