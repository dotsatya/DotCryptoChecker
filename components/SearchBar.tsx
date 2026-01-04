"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "./ui/input";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (pathname === "/coins") {
        router.push(`/coins?search=${search}`);
      }
    }
  };

  return (
    <Input
      type="text"
      placeholder="Search coins by name, symbol, or rank..."
      value={search}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      onKeyDown={handleSearch}
      className="w-full max-w-48 sm:max-w-56 md:max-w-64 rounded-2xl"
    />
  );
};

export default SearchBar;
