import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { StaffFormValues } from '../schemas/staffFormSchema'
import type { StaffProfile } from '../types'
import { StaffForm } from './StaffForm'

interface EditStaffModalProps {
  staff: StaffProfile | null
  onOpenChange: (open: boolean) => void
}

export function EditStaffModal({ staff, onOpenChange }: EditStaffModalProps) {
  function handleFormSubmit(values: StaffFormValues) {
    // TODO: 21.3.6 で useUpdateStaff を接続する
    console.log('update', staff?.id, values)
    onOpenChange(false)
  }

  return (
    <Dialog open={staff !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle>スタッフ情報の編集</DialogTitle>
          <DialogDescription>
            スタッフの情報を編集してください
          </DialogDescription>
        </DialogHeader>

        {staff && (
          <StaffForm
            isPending={false}
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
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            form="staff-form"
            className="bg-blue-600 hover:bg-blue-700"
          >
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
