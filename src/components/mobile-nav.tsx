import { siteConfig } from "@/config/site";
import { NavItem } from "@/types";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import Link from "next/link";

interface MainNavProps {
  items: NavItem[];
}
export default function MobileNav({ items }: MainNavProps) {
  useLockBodyScroll();

  return (
    <div className="fixed inset-0 top-16 z-50 p-6 pb-32 shadow-md md:hidden animate-in slide-in-from-bottom-80">
      <div className="grid gap-6 p-4 bg-popover text-popover-foreground shadow-md">
        <Link href={"/"} className="font-bold">
          <span>{siteConfig.name}</span>
        </Link>
        <nav className="text-sm flex gap-4">
          {items.map((item, index) => (
            <Link href={item.href} key={index}>
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
