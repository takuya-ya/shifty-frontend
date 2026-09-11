import { StaffListTable } from '@/features/staff/components/StaffListTable'

const MOCK_STAFFS = [
  {
    id: 1,
    name: '田中 太郎',
    hourly_wage: 1200,
    is_student: false,
    memo: 'リーダー経験あり。シフトリーダー候補。',
    positions: [
      { id: 1, name: 'ホール' },
      { id: 2, name: 'キッチン' },
    ],
  },
  {
    id: 2,
    name: '佐藤 花子',
    hourly_wage: 1100,
    is_student: true,
    memo: '接客スキル高い。土日メイン希望。',
    positions: [{ id: 1, name: 'ホール' }],
  },
  {
    id: 3,
    name: '鈴木 一郎',
    hourly_wage: 1300,
    is_student: false,
    memo: '',
    positions: [{ id: 2, name: 'キッチン' }],
  },
  {
    id: 4,
    name: '高橋 美咲',
    hourly_wage: 1050,
    is_student: true,
    memo: '大学1年生、平日夜希望。',
    positions: [
      { id: 1, name: 'ホール' },
      { id: 3, name: 'レジ' },
    ],
  },
  {
    id: 5,
    name: '渡辺 健太',
    hourly_wage: 1250,
    is_student: false,
    memo: 'オールラウンダー。',
    positions: [
      { id: 2, name: 'キッチン' },
      { id: 3, name: 'レジ' },
    ],
  },
]

export function AdminStaffsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-gray-900">スタッフ管理</h1>
      </header>

      <section className="flex-1 overflow-hidden p-6">
        <div className="h-full bg-white rounded-lg border border-gray-200 flex flex-col">
          <StaffListTable staffs={MOCK_STAFFS} />
        </div>
      </section>
    </div>
  )
}
