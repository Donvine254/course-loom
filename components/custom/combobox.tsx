"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface ComboBoxProps {
  categories: Category[];
  value?: string;
  onChange: (value: string) => void;
}

export default function ComboBox({
  categories,
  value,
  onChange,
}: ComboBoxProps) {
  const [selected, setSelected] = useState(value || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (id: string) => {
    setSelected(id);
    onChange(id);
    setShowDropdown(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    if (query === "") {
      setFilteredCategories(categories);
    } else {
      setFilteredCategories(
        categories.filter((category) =>
          category.name.toLowerCase().includes(query)
        )
      );
    }
  };

  return (
    <div className="relative min-w-md flex items-center" ref={dropdownRef}>
      <button
        className="w-full max-w-md flex items-center justify-between bg-white dark:bg-input px-3 py-2 border dark:border-input rounded-md text-sm"
        onClick={() => setShowDropdown(!showDropdown)}
        type="button">
        {categories.find((cat) => cat.id === selected)?.name ||
          "Select Category"}
        <ChevronsUpDown className="h-4 w-4 text-gray-400" />
      </button>

      {showDropdown && (
        <div className="border border-input w-full max-w-md bg-card absolute top-full left-0 right-0 mt-2 z-50 rounded-md shadow">
          <div className="sticky flex items-center top-0 z-20 bg-input group ">
            <Search className="h-4 w-4 text-gray-400 absolute left-3" />
            <input
              type="search"
              placeholder="Search a category..."
              onChange={handleSearch}
              className="placeholder:text-gray-400 text-sm pl-10 w-full border-b border-b-input focus:bg-input focus:outline-none focus:ring-none px-3 py-2 rounded-t-md"
            />
          </div>

          <ol className="p-4 space-y-1 font-medium text-sm text-gray-600 dark:text-muted-foreground max-h-[200px] overflow-y-auto">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <li
                  key={category.id}
                  className={cn(
                    "flex justify-between gap-2 cursor-pointer px-2 py-1 rounded-md hover:bg-input",
                    selected === category.id &&
                      "bg-blue-500 text-white hover:bg-blue-500 hover:text-white"
                  )}
                  onClick={() => handleSelect(category.id)}>
                  {category.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selected === category.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">No results</li>
            )}
          </ol>
        </div>
      )}
    </div>
  );
}
