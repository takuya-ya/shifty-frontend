import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BalanceBar } from '../BalanceBar'

describe('BalanceBar', () => {
  it('shortage のとき bg-red-500 クラスと ▲N テキストを表示する', () => {
    const { container } = render(<BalanceBar status="shortage" diff={-2} />)
    expect(screen.getByText('▲2')).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('bg-red-500')
  })

  it('just のとき bg-green-500 クラスと OK テキストを表示する', () => {
    const { container } = render(<BalanceBar status="just" diff={0} />)
    expect(screen.getByText('OK')).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('bg-green-500')
  })

  it('surplus のとき bg-blue-500 クラスと +N テキストを表示する', () => {
    const { container } = render(<BalanceBar status="surplus" diff={1} />)
    expect(screen.getByText('+1')).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('bg-blue-500')
  })
})
