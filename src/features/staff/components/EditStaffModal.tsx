import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useUpdateStaff } from '../hooks/useUpdateStaff'
import type { StaffFormValues } from '../schemas/staffFormSchema'
import type { StaffProfile } from '../types'
import { StaffForm } from './StaffForm'

interface EditStaffModalProps {
  staff: StaffProfile | null
  onOpenChange: (open: boolean) => void
}

export function EditStaffModal({ staff, onOpenChange }: EditStaffModalProps) {
  const { mutate: updateStaff, isPending } = useUpdateStaff()

  function handleFormSubmit(values: StaffFormValues) {
    // staff の型に null が残っていると staff.id でエラーになるため、null を除外して型を絞り込む。実行時はフォームが描画されず到達しない
    if (staff === null) return

    updateStaff(
      { id: staff.id, values },
      {
        onSuccess: () => {
          onOpenChange(false)
        },
      },
    )
  }

  return (
    <Dialog open={staff !== null} onOpenChange={(next) => { if (!isPending) onOpenChange(next) }}>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle>スタッフ情報の編集</DialogTitle>
          <DialogDescription>
            スタッフの情報を編集してください
          </DialogDescription>
        </DialogHeader>

        {staff && (
          <StaffForm
            isPending={isPending}
            onSubmit={handleFormSubmit}
            defaultValues={{
              name: staff.name,
              positionIds: staff.positions.map((p) => p.id),
              hourlyWage: staff.hourly_wage,
              isStudent: staff.is_student,
              memo: staff.memo,
            }}
          />
        )}

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
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
