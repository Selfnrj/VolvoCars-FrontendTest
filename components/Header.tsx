"use client";

import Link from "next/link";
import Avatar from "react-avatar";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-8 sm:py-16 sm:px-0">
      <Link href="/" className="hover:no-underline">
        <h1 className="text-black text-6xl font-bold">Volvo Cars</h1>
      </Link>
      <a href="https://www.linkedin.com/in/ambjorn/" target="_blank">
        <Avatar name="Ambjörn Fagerström" size="50" round={true} color="#000" />
      </a>
    </header>
  );
}
