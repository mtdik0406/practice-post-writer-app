import { NavItem } from "@/types";
import Link from "next/link";
import { ReactNode } from "react";

interface MainNavProps {
  items?: NavItem[];
  children?: ReactNode;
}

export default function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex items-center md:gap-10">
      <Link href="/" className="hidden md:flex items-center gap-2">
        <span className="font-bold hidden md:inline-block">Post Writer</span>
      </Link>
      <nav className="md:flex gap-6 hidden">
        {items?.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="text-lg sm:text-sm font-medium hover:text-foreground/80"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
