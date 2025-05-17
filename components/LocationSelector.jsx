import React, { useState } from "react";
import {
  getAllCountries,
  getAreas,
  getSubCounties,
} from "../lib/getLocationOptions";
import { ChevronLeft, ChevronRight } from "react-feather";
import Link from "next/link";
import { kebabCase, snakeCase } from "lodash";

export default function LocationSelector() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  return (
    <div className="w-full grid md:grid-cols-3 gap-6">
      <div className="md:hidden border rounded-md">
        {selectedRegion && (
          <button
            onClick={() => {
              setSelectedRegion("");
              setSelectedTown("");
            }}
            className={`w-full flex gap-4 p-3 border-b last:border-b-0 `}
          >
            <ChevronLeft />
            <span>Choose another region</span>
          </button>
        )}
        {selectedTown && (
          <button
            onClick={() => {
              setSelectedTown("");
            }}
            className={`w-full flex gap-4 p-3 border-b last:border-b-0 `}
          >
            <ChevronLeft />
            <span>Choose another town</span>
          </button>
        )}
      </div>
      <div className={selectedRegion ? "hidden md:block" : ""}>
        <h3 className="text-sm text-gray-600 uppercase mb-4">Region</h3>
        <div className="border rounded">
          {getAllCountries().map((region) => (
            <button
              onClick={() => setSelectedRegion(region)}
              key={region}
              className={`w-full flex justify-between p-3 border-b last:border-b-0 ${
                region === selectedRegion ? "bg-gray-200 text-primary" : ""
              }`}
            >
              <span>{region}</span>
              <ChevronRight />
            </button>
          ))}
        </div>
      </div>
      <div className={selectedTown ? "hidden md:block" : ""}>
        <h3 className="text-sm text-gray-600 uppercase mb-4">Town</h3>
        {selectedRegion && (
          <div className="border rounded">
            <Link
              href={`/properties-in-${snakeCase(selectedRegion)}`}
              className={`w-full flex justify-between p-3 border-b last:border-b-0 text-primary`}
            >
              <span>All {selectedRegion}</span>
              <ChevronRight />
            </Link>
            {(selectedRegion ? getSubCounties(selectedRegion) : []).map(
              (town) => (
                <button
                  onClick={() => setSelectedTown(town)}
                  key={town}
                  className={`w-full flex justify-between p-3 border-b last:border-b-0 ${
                    town === selectedTown ? "bg-gray-200 text-primary" : ""
                  }`}
                >
                  <span>{town}</span>
                  <ChevronRight />
                </button>
              )
            )}
          </div>
        )}
      </div>
      <div className={!selectedTown ? "hidden md:block" : ""}>
        <h3 className="text-sm text-gray-600 uppercase mb-4">Area</h3>
        {selectedTown && (
          <div className="border rounded">
            <Link
              href={`/properties-in-${snakeCase(selectedTown)}`}
              className={`w-full flex justify-between p-3 border-b last:border-b-0 text-primary`}
            >
              <span>All {selectedTown}</span>
              <ChevronRight />
            </Link>
            {(selectedRegion && selectedTown
              ? getAreas(selectedRegion, selectedTown)
              : []
            ).map((area) => (
              <Link
                href={`/properties-in-${snakeCase(area)}`}
                key={area}
                className={`w-full flex justify-between p-3 border-b last:border-b-0`}
              >
                <span>{area}</span>
                <ChevronRight />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
