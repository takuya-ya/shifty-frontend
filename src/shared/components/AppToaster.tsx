import { Toaster } from "sonner";

// 右上に出すと各画面のヘッダー右端にある操作ボタン（「スタッフを追加」等）に重なり、
// トーストが消えるまでボタンを押せなくなるため、ヘッダーと重ならない右下に表示する
export function AppToaster() {
  return <Toaster position="bottom-right" richColors />;
}
