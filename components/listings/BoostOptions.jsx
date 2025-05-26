import React from "react";
import {
  ArrowUp,
  ArrowUpCircle,
  CheckCircle,
  CornerUpLeft,
  Power,
  RotateCcw,
} from "react-feather";

export default function BoostOptions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      <button className="p-4 rounded bg-gray-200 flex items-center flex-col gap-4">
        <ArrowUpCircle className="h-6 w-6" />
        <span>Move to top</span>
      </button>

      <button className="p-4 rounded bg-gray-200 flex items-center flex-col gap-4">
        <CheckCircle className="h-6 w-6" />
        <span>Mark sold/rented</span>
      </button>
      <button className="p-4 rounded bg-gray-200 flex items-center flex-col gap-4">
        <RotateCcw className="h-6 w-6" />
        <span>Renew</span>
      </button>
      <button className="p-4 rounded bg-gray-200 flex items-center flex-col gap-4">
        <Power className="h-6 w-6" />
        <span>Unpublish</span>
      </button>
    </div>
  );
}
