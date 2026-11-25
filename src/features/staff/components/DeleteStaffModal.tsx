import { AlertDialog } from '@base-ui/react/alert-dialog'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { isApiError } from '@/shared/api/error'
import { useDeleteStaff } from '../hooks/useDeleteStaff'
import type { StaffProfile } from '../types'

const HTTP_STATUS_NOT_FOUND = 404

interface DeleteStaffModalProps {
  staff: StaffProfile | null
  onOpenChange: (open: boolean) => void
}

export function DeleteStaffModal({ staff, onOpenChange }: DeleteStaffModalProps) {
  const { mutate, isPending } = useDeleteStaff()

  function handleConfirm() {
    // staff の型に null が残っていると staff.id でエラーになるため、null を除外して型を絞り込む。実行時はモーダルが開かず到達しない
    if (staff === null) return

    mutate(staff.id, {
      onSuccess: () => {
        onOpenChange(false)
      },
      onError: (error) => {
        if (isApiError(error) && error.status === HTTP_STATUS_NOT_FOUND) {
          onOpenChange(false)
        }
      },
    })
  }

  return (
    <AlertDialog.Root
      open={staff !== null}
      onOpenChange={(next) => { if (!isPending) onOpenChange(next) }}
    >
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 bg-gray-900/50 z-40" />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-xl p-6 w-full max-w-[420px]">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <AlertDialog.Title className="text-gray-900 font-semibold">
              スタッフを削除しますか？
            </AlertDialog.Title>
          </div>
          <AlertDialog.Description className="text-gray-600 text-sm">
            このスタッフの登録情報を削除します。元に戻すことはできません。
          </AlertDialog.Description>
          <div className="mt-3 mb-6 p-3 bg-red-50 rounded-md border border-red-200">
            <p className="text-gray-900">
              削除対象：<strong>{staff?.name ?? ''}</strong>
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700 text-white border-transparent"
            >
              削除する
            </Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
