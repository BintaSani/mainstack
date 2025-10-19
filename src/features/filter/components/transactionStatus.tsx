import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useFilter } from "@/shared/context/filterContext";

const transactionStatusOptions = ["Successful", "Pending", "Failed"];

export default function TransactionStatusSelect() {
  const { setTempFilters: setFilters, appliedFilters: filters } = useFilter();
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update global context when selection changes
  useEffect(() => {
    setFilters({
      ...filters,
      statuses: selected.map((s) => s.toLowerCase()),
    });
  }, [selected]);

  const toggleOption = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="w-full relative" ref={ref}>
      <label className="block text-base leading-6 font-semibold text-[#131316] mb-3">
        Transaction Status
      </label>

      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full flex justify-between items-center rounded-lg border border-[#EFF1F6] ${
          open ? "bg-white" : "bg-[#EFF1F6]"
        }  px-4 py-3.5 text-left text-sm font-medium text-gray-900  focus:outline-2`}
      >
        <span className="truncate">
          {selected.length > 0
            ? selected.join(", ")
            : "Select Transaction Status"}
        </span>
        <ChevronDown
          className={`ml-2 h-4 w-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="mt-2 absolute max-h-48 z-30 w-full overflow-y-auto rounded-xl bg-white p-2 shadow-lg">
          {transactionStatusOptions.map((option) => (
            <label
              key={option}
              className="flex items-center space-x-3 rounded-md p-3.5 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="h-4 w-4 accent-black"
              />
              <span className="text-base font-semibold text-[#131316]">
                {option}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
