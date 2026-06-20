import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Shift } from '../types'

type ShiftEditMode = 'create' | 'edit'

interface ShiftEditModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  staffName: string
  date: Date
  shift?: Shift
  isPending?: boolean
}

export function ShiftEditModal({
  open,
  onOpenChange,
  staffName,
  date,
  shift,
  isPending = false,
}: ShiftEditModalProps) {
  const mode: ShiftEditMode = shift ? 'edit' : 'create'
  const dateLabel = format(date, 'yyyy年M月d日（E）', { locale: ja })

  // TODO: シフト保存API接続タスクで実装
  function handleSave() {
    onOpenChange(false)
  }

  // TODO: シフト削除API接続タスクで実装
  function handleDelete() {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-130">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'シフトを登録' : 'シフトを編集'}
          </DialogTitle>
          <DialogDescription>
            {staffName} - {dateLabel}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="shift-memo">メモ</Label>
            <Textarea
              id="shift-memo"
              defaultValue={shift?.memo ?? ''}
              placeholder="メモを入力（任意）"
              rows={4}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center">
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
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSave}
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
