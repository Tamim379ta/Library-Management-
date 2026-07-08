'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Person,
  Persons,
  BookOpen,
  SquareListUl,
  ChartMixed,
  Gear,
  Plus,
} from "@gravity-ui/icons";

const adminNavItems = [
  { icon: House, label: "Dashboard", href: "/dashboard/admin" },
  { icon: Persons, label: "Manage Users", href: "/dashboard/admin/manage-users" },
  { icon: BookOpen, label: "Manage Books", href: "/dashboard/admin/manage-books" },
  { icon: Plus, label: "Add Book", href: "/dashboard/admin/add-book" },
  { icon: SquareListUl, label: "All Borrows", href: "/dashboard/admin/all-borrows" },
  { icon: ChartMixed, label: "Analytics", href: "/dashboard/admin/analytics" },
  { icon: Gear, label: "Settings", href: "/dashboard/admin/settings" },
];

const studentNavItems = [
  { icon: House, label: "Dashboard", href: "/dashboard/student" },
  { icon: BookOpen, label: "Browse Books", href: "/dashboard/student/books" },
  { icon: SquareListUl, label: "My Borrows", href: "/dashboard/student/my-borrows" },
  { icon: Person, label: "Update Profile", href: "/dashboard/student/update-profile" },
];

export function ActiveNavLinks({ role }) {
  const pathname = usePathname();

  const items = role === "admin" ? adminNavItems : studentNavItems;

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors
              ${isActive
                ? "bg-[#e8f2ee] text-[#659287] font-semibold"
                : "text-foreground hover:bg-default"
              }`}
          >
            <item.icon className={`size-5 ${isActive ? "text-[#659287]" : "text-muted"}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}