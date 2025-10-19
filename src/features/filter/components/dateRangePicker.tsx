import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useFilter } from "@/shared/context/filterContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function DateRangePicker() {
  const { tempFilters, setTempFilters } = useFilter();

  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Label className="px-1 text-sm font-semibold text-foreground/80">
        Date Range
      </Label>
      <div className="flex gap-1.5 ">
        {/* Start Date Picker */}
        <Popover open={openStart} onOpenChange={setOpenStart}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-1/2 flex justify-between items-center rounded-lg border border-[#EFF1F6] focus:bg-white bg-[#EFF1F6]  text-left text-sm font-medium text-gray-900  focus:outline-2 outline-black`}
            >
              {tempFilters.startDate
                ? formatDate(tempFilters.startDate)
                : "Select start date"}
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform ${
                  openStart ? "rotate-180" : ""
                }`}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            sideOffset={8}
            className="w-auto p-0 rounded-xl shadow-lg"
          >
            <Calendar
              mode="single"
              selected={tempFilters.startDate || undefined}
              onSelect={(date) => {
                setTempFilters({ startDate: date ?? null });
                setOpenStart(false);
              }}
              month={tempFilters.startDate || new Date()}
              onMonthChange={() => {}}
            />
          </PopoverContent>
        </Popover>

        {/* End Date Picker */}
        <Popover open={openEnd} onOpenChange={setOpenEnd}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-1/2 flex justify-between items-center rounded-lg border border-[#EFF1F6] focus:bg-white bg-[#EFF1F6]  px-4 py-3.5 text-left text-sm font-medium text-gray-900  focus:outline-2 outline-black`}
            >
              {tempFilters.endDate
                ? formatDate(tempFilters.endDate)
                : "Select end date"}
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform ${
                  openEnd ? "rotate-180" : ""
                }`}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={8}
            className="w-auto p-0  rounded-xl shadow-lg"
          >
            <Calendar
              mode="single"
              selected={tempFilters.endDate || undefined}
              onSelect={(date) => {
                setTempFilters({ endDate: date ?? null });
                setOpenEnd(false);
              }}
              month={tempFilters.endDate || new Date()}
              onMonthChange={() => {}}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
