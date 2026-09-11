import { Pencil, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { StaffProfile } from '@/features/staff/types'

interface StaffListTableProps {
  staffs: StaffProfile[]
}

const POSITION_COLORS: Record<string, string> = {
  ホール: 'bg-blue-100 text-blue-700',
  キッチン: 'bg-green-100 text-green-700',
  レジ: 'bg-purple-100 text-purple-700',
}

export function StaffListTable({ staffs }: StaffListTableProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-gray-50 z-10">
          <TableRow className="border-b border-gray-200">
            <TableHead className="bg-gray-50">氏名</TableHead>
            <TableHead className="bg-gray-50">ポジション</TableHead>
            <TableHead className="bg-gray-50">時給（円/h）</TableHead>
            <TableHead className="bg-gray-50">高校生</TableHead>
            <TableHead className="bg-gray-50">メモ</TableHead>
            <TableHead className="text-right bg-gray-50">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffs.map((staff) => (
            <TableRow key={staff.id} className="h-14 hover:bg-gray-50">
              <TableCell>
                <span className="text-gray-900">{staff.name}</span>
              </TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {staff.positions.map((position) => (
                    <Badge
                      key={position.id}
                      variant="secondary"
                      className={POSITION_COLORS[position.name] ?? 'bg-gray-100 text-gray-700'}
                    >
                      {position.name}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-gray-900">¥{staff.hourly_wage.toLocaleString()}</span>
              </TableCell>
              <TableCell>
                {staff.is_student && (
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 border-amber-200"
                  >
                    高校生
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <span className="text-gray-600 line-clamp-1">{staff.memo || '—'}</span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`${staff.name}を編集`}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`${staff.name}を削除`}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
