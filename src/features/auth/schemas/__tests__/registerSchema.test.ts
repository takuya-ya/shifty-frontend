import { describe, it, expect } from 'vitest'
import { registerSchema } from '../registerSchema'

const validInput = {
  name: 'テストユーザー',
  email: 'test@example.com',
  password: 'password123',
  password_confirmation: 'password123',
}

describe('registerSchema', () => {
  it('正常な入力でバリデーション通過する', () => {
    const result = registerSchema.safeParse(validInput)
    expect(result.success).toBe(true)
  })

  it('名前が空の場合エラーになる', () => {
    const result = registerSchema.safeParse({ ...validInput, name: '' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('名前を入力してください')
  })

  it('メールアドレスが不正な形式の場合エラーになる', () => {
    const result = registerSchema.safeParse({ ...validInput, email: 'not-an-email' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('メールアドレスの形式が正しくありません')
  })

  it('パスワードが8文字未満の場合エラーになる', () => {
    const result = registerSchema.safeParse({ ...validInput, password: '1234567', password_confirmation: '1234567' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('パスワードは8文字以上で入力してください')
  })

  it('パスワード確認が一致しない場合エラーになる', () => {
    const result = registerSchema.safeParse({ ...validInput, password_confirmation: 'different123' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('パスワードが一致しません')
  })
})
