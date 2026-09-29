import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { usePositions } from '@/shared/hooks/usePositions'
import { staffFormSchema, type StaffFormValues } from '../schemas/staffFormSchema'

const POSITION_COLORS: Record<string, string> = {
  ホール: 'bg-blue-100 text-blue-700',
  キッチン: 'bg-green-100 text-green-700',
}

interface PositionToggleGroupProps {
  positions: { id: number; name: string }[]
  selectedIds: number[]
  onChange: (ids: number[]) => void
}

function PositionToggleGroup({ positions, selectedIds, onChange }: PositionToggleGroupProps) {
  function toggle(id: number) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((selectedId) => selectedId !== id))
    } else {
      onChange([...selectedIds, id])
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {positions.map((position) => {
        const isSelected = selectedIds.includes(position.id)
        return (
          <button
            key={position.id}
            type="button"
            onClick={() => toggle(position.id)}
            className={`px-3 py-1.5 rounded-md border transition-colors ${
              isSelected
                ? `${POSITION_COLORS[position.name] ?? 'bg-gray-100 text-gray-700'} border-transparent`
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {position.name}
          </button>
        )
      })}
    </div>
  )
}

interface StaffFormProps {
  isPending?: boolean
  onSubmit: (values: StaffFormValues) => void
}

export function StaffForm({ isPending = false, onSubmit }: StaffFormProps) {
  const positions = usePositions()

  const { control, register, handleSubmit, formState: { errors } } = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: '',
      positionIds: [],
      hourlyWage: 0,
      isStudent: false,
      memo: '',
    },
  })

  return (
    <form id="staff-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          氏名 <span className="text-red-600">*</span>
        </Label>
        <Input id="name" placeholder="例：田中 太郎" disabled={isPending} {...register('name')} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>
          ポジション <span className="text-red-600">*</span>
        </Label>
        <Controller
          name="positionIds"
          control={control}
          render={({ field }) => (
            <PositionToggleGroup positions={positions} selectedIds={field.value} onChange={field.onChange} />
          )}
        />
        {errors.positionIds && <p className="text-sm text-red-500">{errors.positionIds.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hourlyWage">時給（円/h）</Label>
        <Input
          id="hourlyWage"
          type="number"
          placeholder="例：1200"
          disabled={isPending}
          {...register('hourlyWage', { valueAsNumber: true })}
        />
        {errors.hourlyWage && <p className="text-sm text-red-500">{errors.hourlyWage.message}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="isStudent"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="isStudent"
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isPending}
            />
          )}
        />
        <Label htmlFor="isStudent" className="cursor-pointer">
          高校生
        </Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="memo">メモ</Label>
        <Textarea
          id="memo"
          placeholder="補足や勤務条件等を記録"
          rows={3}
          disabled={isPending}
          className="resize-none"
          {...register('memo')}
        />
        {errors.memo && <p className="text-sm text-red-500">{errors.memo.message}</p>}
      </div>
    </form>
  )
}
