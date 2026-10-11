interface Position {
  id: number
  name: string
}

// Phase1: 静的リスト（設定API接続タスクで /api/v1/positions に差し替え）
const POSITIONS: Position[] = [
  { id: 1, name: 'ホール' },
  { id: 2, name: 'キッチン' },
]

export function usePositions(): Position[] {
  return POSITIONS
}
