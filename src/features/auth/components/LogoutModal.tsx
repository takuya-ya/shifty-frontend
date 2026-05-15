import { useState } from 'react'
import { AlertDialog } from '@base-ui/react/alert-dialog'
import { AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { useLogout } from '../hooks/useLogout'
import { PATHS } from '../../../routes/paths'

interface LogoutModalProps {
  open: boolean
  onClose: () => void
}

export function LogoutModal({ open, onClose }: LogoutModalProps) {
  const navigate = useNavigate()
  const { mutate: logout, isPending } = useLogout()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleLogout = () => {
    setErrorMessage(null)
    logout(undefined, {
      onSuccess: () => {
        onClose()
        navigate(PATHS.LOGIN)
      },
      onError: (error) => setErrorMessage(error.message),
    })
  }

  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && !isPending) {
          setErrorMessage(null)
          onClose()
        }
      }}
    >
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 bg-gray-900/50 z-40" />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <AlertDialog.Title className="text-gray-900 font-semibold mb-2">
                ログアウト確認
              </AlertDialog.Title>
              <AlertDialog.Description className="text-gray-600 text-sm">
                ログアウトしてもよろしいですか？保存されていない変更は失われます。
              </AlertDialog.Description>
            </div>
          </div>
          {errorMessage && (
            <p className="text-sm text-red-600 mb-4">{errorMessage}</p>
          )}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose} disabled={isPending}>
              キャンセル
            </Button>
            <Button
              onClick={handleLogout}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700 text-white border-transparent"
            >
              ログアウト
            </Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
