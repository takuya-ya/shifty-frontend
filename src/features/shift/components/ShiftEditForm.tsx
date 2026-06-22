import { Combobox } from '@base-ui/react/combobox'
import { CheckIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Shift } from '../types'

const TIME_OPTIONS = generateTimeOptions()

function generateTimeOptions(): string[] {
  const times: string[] = []
  for (let hour = 9; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      times.push(
        `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      )
    }
  }
  return times
}

interface TimeComboboxProps {
  defaultValue: string
  disabled?: boolean
}

function TimeCombobox({ defaultValue, disabled = false }: TimeComboboxProps) {
  const filterFn = (item: string, query: string) => {
    if (!query) return true
    const normalizedItem = item.replace(':', '')
    const normalizedQuery = query.replace(':', '')
    return normalizedItem.startsWith(normalizedQuery)
  }

  return (
    <Combobox.Root defaultValue={defaultValue} disabled={disabled} filter={filterFn} items={TIME_OPTIONS} autoHighlight>
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
  )
}

interface ShiftEditFormProps {
  shift?: Shift
  isPending?: boolean
}

export function ShiftEditForm({ shift, isPending = false }: ShiftEditFormProps) {
  return (
    <div className="space-y-6 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>出勤時間</Label>
          <TimeCombobox defaultValue={shift?.startAt?.slice(11, 16) ?? '09:00'} disabled={isPending} />
        </div>

        <div className="space-y-2">
          <Label>退勤時間</Label>
          <TimeCombobox defaultValue={shift?.endAt?.slice(11, 16) ?? '18:00'} disabled={isPending} />
        </div>

        <div className="space-y-2">
          <Label>休憩開始</Label>
          <TimeCombobox defaultValue={shift?.breakStartAt?.slice(11, 16) ?? '12:00'} disabled={isPending} />
        </div>

        <div className="space-y-2">
          <Label>休憩終了</Label>
          <TimeCombobox defaultValue={shift?.breakEndAt?.slice(11, 16) ?? '13:00'} disabled={isPending} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="shift-memo">メモ</Label>
        <Textarea
          id="shift-memo"
          defaultValue={shift?.memo ?? ''}
          placeholder="メモを入力（任意）"
          rows={4}
          disabled={isPending}
          className="resize-none"
        />
      </div>
    </div>
  )
}
