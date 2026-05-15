import { NavLink } from "react-router-dom";
import { LogOut, type LucideIcon } from "lucide-react";
import { cn } from "../../../lib/utils";

interface SidebarItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  items: SidebarItem[];
  onLogoutClick: () => void;
}

export function Sidebar({ items, onLogoutClick }: SidebarProps) {
  return (
    <aside className="w-16 h-full bg-white border-r border-gray-200 flex flex-col">
      <nav className="flex-1 p-2 space-y-1" aria-label="主要機能ナビゲーション">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            aria-label={label}
            className={({ isActive }) =>
              cn(
                "w-full flex items-center justify-center px-2 py-3 rounded-lg transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50",
              )
            }
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
          </NavLink>
        ))}
      </nav>

      <div className="p-2 border-t border-gray-200">
        <button
          type="button"
          onClick={onLogoutClick}
          aria-label="ログアウト"
          className="w-full flex items-center justify-center px-2 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <LogOut className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
