import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Shift } from '../types'
import { ShiftEditForm } from './ShiftEditForm'
import type { ShiftEditFormValues } from '../schemas/shiftEditSchema'
import { toShiftPayload } from '../utils/toShiftPayload'
import { useCreateShift } from '../hooks/useCreateShift'

type ShiftEditMode = 'create' | 'edit'

interface ShiftEditModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  staffId: number
  staffName: string
  date: Date
  shift?: Shift
}

export function ShiftEditModal({
  open,
  onOpenChange,
  staffId,
  staffName,
  date,
  shift,
}: ShiftEditModalProps) {
  const mode: ShiftEditMode = shift ? 'edit' : 'create'
  const dateLabel = format(date, 'yyyy年M月d日（E）', { locale: ja })
  const { mutate, isPending } = useCreateShift()

  function handleFormSubmit(values: ShiftEditFormValues) {
    const payload = toShiftPayload(values, date)
    if (mode === 'create') {
      mutate({ staffId, payload }, {
        onSuccess: () => {
          onOpenChange(false)
        },
      })
    }
    // TODO: mode === 'edit' は useUpdateShift（19.4.3）で対応
  }

  // TODO: シフト削除API接続タスクで実装
  function handleDelete() {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!isPending) onOpenChange(next) }}>
      <DialogContent className="max-w-130">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'シフトを登録' : 'シフトを編集'}
          </DialogTitle>
          <DialogDescription>
            {staffName} - {dateLabel}
          </DialogDescription>
        </DialogHeader>

        <ShiftEditForm shift={shift} isPending={isPending} onSubmit={handleFormSubmit} />

        <DialogFooter className="flex justify-between sm:justify-between items-center">
          <div>
            {mode === 'edit' && (
              <Button
                variant="outline"
                onClick={handleDelete}
                disabled={isPending}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
              >
                削除
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              form="shift-edit-form"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isPending}
            >
              保存
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
