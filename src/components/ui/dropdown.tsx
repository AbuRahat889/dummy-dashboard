"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

// ✅ define color map here so Tailwind sees these classes
const statusColors: Record<string, string> = {
  BOOKING_PENDING: "bg-yellow-100 text-yellow-800",
  BOOKING_CONFIRMED: "bg-blue-100 text-blue-800",
  PAYMENT_PENDING: "bg-yellow-100 text-yellow-800",
  PAYMENT_CONFIRMED: "bg-green-100 text-green-800",
  VEHICLE_SHIPPED: "bg-purple-100 text-purple-800",
  VESSEL_DEPARTED: "bg-purple-200 text-purple-900",
  ARRIVED_AT_PORT: "bg-blue-200 text-blue-900",
  CUSTOMS_CLEARANCE: "bg-indigo-100 text-indigo-800",
  READY_FOR_DELIVERY: "bg-teal-100 text-teal-800",
  DELIVERED_TO_HOME: "bg-green-200 text-green-900",
  DELIVERED: "bg-green-500 text-white",
  CANCELLED: "bg-red-500 text-white",
};

export function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className,
  label,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // sync external value
  useEffect(() => {
    if (value !== undefined && value !== selectedValue) {
      setSelectedValue(value);
    }
  }, [value, selectedValue]);

  // close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // escape key closes menu
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen) return;
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    onChange?.(optionValue);
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  const selectedColorClass =
    (selectedValue && statusColors[selectedValue]) ||
    "bg-[#eaeef2] border-gray-200 text-gray-900";

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full  flex items-center justify-between px-4 py-3 text-left border rounded-lg transition-colors duration-150 truncate bg-[#eaeef2]",
          selectedColorClass
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="block truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <svg
          className={cn(
            "w-4 h-4 text-gray-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-[9999] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul
            className="py-1 max-h-60 overflow-auto"
            role="listbox"
            aria-label="Options"
          >
            {options.map((option) => {
              const colorClass = statusColors[option.value] || "";
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "w-full px-4 py-3 text-left transition-colors duration-150",
                      colorClass,
                      selectedValue === option.value
                        ? "ring-2 ring-offset-1 ring-blue-500"
                        : "hover:bg-primaryColor hover:text-white"
                    )}
                    role="option"
                    aria-selected={selectedValue === option.value}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
