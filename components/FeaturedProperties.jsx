import Link from "next/link";
import React from "react";
import { ArrowRight, ArrowUpRight } from "react-feather";
import ListingCard from "./ListingCard";

const FeaturedProperties = ({ properties }) => {
  return (
    <section className="py-10 bg-gray-200">
      <div className="container mb-6 w-full flex flex-wrap justify-between items-end">
        <h2 className="font-bold">
          <span className="text-4xl text-secondary inline-block mr-2">
            Featured
          </span>
          <span className="text-4xl text-primary">Properties</span>
        </h2>
      </div>
      <div className="container w-full grid gap-6 md:grid-cols-3">
        {properties.map((i) => (
          <ListingCard key={i.id} data={i} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;
