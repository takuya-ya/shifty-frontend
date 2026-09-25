import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { StaffForm } from './StaffForm'

interface StaffFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StaffFormModal({ open, onOpenChange }: StaffFormModalProps) {
  const isPending = false

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!isPending) onOpenChange(next) }}>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle>新規スタッフの追加</DialogTitle>
          <DialogDescription>
            新しいスタッフの情報を入力してください
          </DialogDescription>
        </DialogHeader>

        <StaffForm isPending={isPending} onSubmit={() => {}} />

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            form="staff-form"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isPending}
          >
            追加
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
