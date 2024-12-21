"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-center items-center p-4">
      <Link
        href="/"
        className={pathname === "/" ? "font-bold m-4" : "text-blue-500 m-4"}
      >
        Home
      </Link>
      <Link
        href="/about"
        className={
          pathname === "/about" ? "font-bold m-4" : "text-blue-500 m-4"
        }
      >
        About
      </Link>
      <Link
        href="/products/1"
        className={
          pathname.startsWith("/products/1")
            ? "font-bold m-4"
            : "text-blue-500 m-4"
        }
      >
        Product 1
      </Link>
      {/* <Link
        href="/login"
        className={
          pathname === "/login" ? "font-bold m-4" : "text-blue-500 m-4"
        }
      >
        login
      </Link> */}

      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
};
