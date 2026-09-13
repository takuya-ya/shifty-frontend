import { StaffListTable } from '@/features/staff/components/StaffListTable'
import { useStaffs } from '@/features/staff/hooks/useStaffs'

export function AdminStaffsPage() {
  const { data, isPending, isError } = useStaffs()

  return (
    <div className="flex flex-col h-full">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-gray-900">スタッフ管理</h1>
      </header>

      <section className="flex-1 overflow-hidden p-6">
        <div className="h-full bg-white rounded-lg border border-gray-200 flex flex-col">
          {isPending ? (
            <p className="p-6 text-gray-500">読み込み中...</p>
          ) : isError ? (
            <p className="p-6 text-red-600">スタッフ情報の取得に失敗しました</p>
          ) : (
            <StaffListTable staffs={data} />
          )}
        </div>
      </section>
    </div>
  )
}
