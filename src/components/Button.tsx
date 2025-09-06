import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  as?: "a" | "link";
  [key: string]: unknown;
}

export function PrimaryButton({
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={
        "inline-flex items-center rounded-2xl bg-violet-600 px-5 py-3 text-white font-semibold shadow hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 " +
        className
      }
      {...props}
    >
      {children}
    </Link>
  );
}

export function OutlineButton({
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={
        "inline-flex items-center rounded-2xl px-5 py-3 font-medium ring-1 ring-slate-300/60 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 " +
        className
      }
      {...props}
    >
      {children}
    </Link>
  );
}

export function FullWidthButton({
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={
        "mt-5 inline-flex w-full items-center justify-center rounded-xl bg-violet-600 py-2.5 text-white font-semibold hover:brightness-110 " +
        className
      }
      {...props}
    >
      {children}
    </Link>
  );
}
