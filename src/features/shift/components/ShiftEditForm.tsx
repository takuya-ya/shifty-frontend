import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Combobox } from '@base-ui/react/combobox'
import { CheckIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Shift } from '../types'
import { usePositions } from '../hooks/usePositions'
import {
  shiftEditSchema,
  type ShiftEditFormInput,
  type ShiftEditFormValues,
} from '../schemas/shiftEditSchema'

const START_HOUR = 9
const END_HOUR = 22
const MINUTE_INTERVAL = 15
const MINUTES_PER_HOUR = 60

const TIME_OPTIONS = generateTimeOptions()

function generateTimeOptions(): string[] {
  const times: string[] = []
  for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
    for (let minute = 0; minute < MINUTES_PER_HOUR; minute += MINUTE_INTERVAL) {
      times.push(
        `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      )
    }
  }
  return times
}

interface TimeComboboxProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  error?: string
}

function TimeCombobox({ value, onChange, disabled = false, error }: TimeComboboxProps) {
  const filterFn = (item: string, query: string) => {
    if (!query) return true
    const normalizedItem = item.replace(':', '')
    const normalizedQuery = query.replace(':', '')
    return normalizedItem.startsWith(normalizedQuery)
  }

  return (
    <div>
      <Combobox.Root value={value} onValueChange={(v) => { if (v !== null) onChange(v) }} disabled={disabled} filter={filterFn} items={TIME_OPTIONS} autoHighlight>
        <Combobox.Input
          className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="00:00"
        />
        <Combobox.Portal>
          <Combobox.Positioner sideOffset={4} className="z-50">
            <Combobox.Popup className="max-h-60 overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
              <Combobox.List>
                {(item: string) => (
                  <Combobox.Item
                    key={item}
                    value={item}
                    className="relative flex w-full cursor-default items-center rounded-md py-1 pr-8 pl-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50"
                  >
                    <span className="flex-1">{item}</span>
                    <Combobox.ItemIndicator className="absolute right-2 flex size-4 items-center justify-center">
                      <CheckIcon className="size-4" />
                    </Combobox.ItemIndicator>
                  </Combobox.Item>
                )}
              </Combobox.List>
              <Combobox.Empty className="px-2 py-4 text-center text-sm text-muted-foreground">
                該当なし
              </Combobox.Empty>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}

interface ShiftEditFormProps {
  shift?: Shift
  isPending?: boolean
  onSubmit: (values: ShiftEditFormValues) => void
}

export function ShiftEditForm({ shift, isPending = false, onSubmit }: ShiftEditFormProps) {
  const positions = usePositions()
  const positionItems = positions.map((p) => ({ value: p.id.toString(), label: p.name }))

  const { control, register, handleSubmit, formState: { errors } } = useForm<ShiftEditFormInput, unknown, ShiftEditFormValues>({
    resolver: zodResolver(shiftEditSchema),
    defaultValues: {
      positionId: shift?.positionId?.toString() ?? '',
      startTime: shift?.startAt?.slice(11, 16) ?? '09:00',
      endTime: shift?.endAt?.slice(11, 16) ?? '18:00',
      breakStartTime: shift?.breakStartAt?.slice(11, 16) ?? '',
      breakEndTime: shift?.breakEndAt?.slice(11, 16) ?? '',
      memo: shift?.memo ?? '',
    },
  })

  return (
    <form id="shift-edit-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
      <div className="space-y-2">
        <Label>ポジション</Label>
        <Controller
          name="positionId"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} disabled={isPending} items={positionItems}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                {positionItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.positionId && <p className="text-sm text-red-500">{errors.positionId.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>出勤時間</Label>
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <TimeCombobox value={field.value} onChange={field.onChange} disabled={isPending} error={errors.startTime?.message} />
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>退勤時間</Label>
          <Controller
            name="endTime"
            control={control}
            render={({ field }) => (
              <TimeCombobox value={field.value} onChange={field.onChange} disabled={isPending} error={errors.endTime?.message} />
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>休憩開始</Label>
          <Controller
            name="breakStartTime"
            control={control}
            render={({ field }) => (
              <TimeCombobox value={field.value} onChange={field.onChange} disabled={isPending} error={errors.breakStartTime?.message} />
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>休憩終了</Label>
          <Controller
            name="breakEndTime"
            control={control}
            render={({ field }) => (
              <TimeCombobox value={field.value} onChange={field.onChange} disabled={isPending} error={errors.breakEndTime?.message} />
            )}
          />
        </div>
      </div>

      {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}

      <div className="space-y-2">
        <Label htmlFor="shift-memo">メモ</Label>
        <Textarea
          id="shift-memo"
          {...register('memo')}
          placeholder="メモを入力（任意）"
          rows={4}
          disabled={isPending}
          className="resize-none"
        />
      </div>
    </form>
  )
}
