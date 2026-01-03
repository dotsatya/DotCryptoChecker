import React from "react";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { Button } from "../ui/button";

/* ================= TYPES ================= */
interface NavItem {
  label: string;
  href: string;
}

interface NavLinksProps {
  className?: string;
}

/* ================= CONSTANTS ================= */
const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
];

/* ================= REUSABLE NAV ================= */
const NavLinks: React.FC<NavLinksProps> = ({ className }) => {
  return (
    <>
      {NAV_ITEMS.map((item) => (
        <Link key={item.href} href={item.href} className={className}>
          {item.label}
        </Link>
      ))}
    </>
  );
};

const Header: React.FC = () => {
  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className="
          sticky top-2 z-40
          w-[96%] max-w-8xl mx-auto
          flex items-center justify-between
          px-5 py-3
          rounded-xl
          bg-white/50 dark:bg-black/50
          backdrop-blur-xl
          border border-black/10 dark:border-white/10
          shadow-lg shadow-black/10 dark:shadow-black/40
          transition-all duration-300
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-6">
          {/* MOBILE MENU BUTTON */}
          <label
            htmlFor="mobile-menu"
            aria-label="Open menu"
            className="
              lg:hidden
              cursor-pointer
              p-2 rounded-xl
              hover:bg-black/10 dark:hover:bg-white/10
              text-xl font-bold
            "
          >
            ☰
          </label>

          {/* APP NAME - hidden lg:block */}
          <h1 className="hidden sm:block text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            DotCryptoChecker
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-4">
            <NavLinks className="text-base font-medium cursor-pointer hover:text-blue-500 hover:transition-colors" />
          </nav>

          <div className="hidden lg:block border-l-2 dark:border-gray-200"></div>
          <ThemeToggle />

          <Button
            variant="outline"
            className="font-bold rounded-xl  text-red-500  hover:bg-red-500/10 hover:dark:bg-red-500/20 hover:transition-colors cursor-pointer"
            aria-label="Log out"
          >
            Log Out
          </Button>
        </div>
      </header>

      {/* ================= MOBILE SIDEBAR ================= */}

      {/* TOGGLE */}
      <input type="checkbox" id="mobile-menu" className="hidden peer" />

      {/* OVERLAY */}
      <label
        htmlFor="mobile-menu"
        aria-label="Close menu overlay"
        className="
          fixed inset-0 z-40
          bg-black/40
          hidden peer-checked:block
          lg:hidden
        "
      />

      {/* SIDEBAR */}
      <aside
        className="
          fixed top-0 left-0 z-50
          h-full w-64
          bg-white dark:bg-[#080808]
          border-r border-gray-200 dark:border-white/10
          transform -translate-x-full
          peer-checked:translate-x-0
          transition-transform duration-300
          lg:hidden
          flex flex-col
        "
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Menu
          </h2>

          <label
            htmlFor="mobile-menu"
            aria-label="Close menu"
            className="
              cursor-pointer
              p-2 rounded-lg
              hover:bg-black/10 dark:hover:bg-white/10
              text-xl font-bold
            "
          >
            ×
          </label>
        </div>

        {/* MOBILE NAV */}
        <nav className="flex-1 px-6 py-6 space-y-4 text-lg font-semibold text-slate-800 dark:text-slate-200">
          <NavLinks className="block text-lg font-semibold hover:text-blue-500 transition-colors" />
        </nav>
      </aside>
    </>
  );
};

export default Header;
