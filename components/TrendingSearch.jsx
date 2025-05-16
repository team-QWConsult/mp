import Link from "next/link";
import React from "react";
import { attributes } from "../content/seo.md";

export default function TrendingSearch() {
  return (
    <section className="py-10">
      <div className="container mb-8 w-full flex flex-wrap justify-between items-end">
        <h2 className="font-bold font-serif uppercase">
          <span className="text-3xl md:text-4xl text-primary block mb-2">
            Trending
          </span>
          <span className="text-5xl md:text-6xl block mb-2">Searches</span>
        </h2>
      </div>
      <div className="container w-full grid gap-4 md:grid-cols-3">
        {attributes.topSearches.map((i) => (
          <Link
            key={i.title}
            href={i.link}
            className="hover:underline text-black/80 text-lg"
          >
            {i.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

const searchList = [
  { title: "Rentals in Bahrain", link: "/properties" },
  { title: "Villas in Bahrain", link: "/villa-for-rent" },
  { title: "Apartments in Bahrain", link: "/apartment-for-rent" },
  {
    title: "Villas for rent in Amwaj",
    link: "/property-search?category=villa&search=amwaj",
  },
  {
    title: "Apartments for rent in Amwaj",
    link: "/property-search?category=apartment&search=amwaj",
  },
  {
    title: "Amwaj island villas for rent",
    link: "/property-search?category=apartment&search=amwaj%20island",
  },
  { title: "Affordable rentals in Bahrain", link: "/properties" },
  {
    title: "Apartments in Juffair Bahrain",
    link: "/property-search?category=apartment&search=juffair",
  },
  { title: "3 bedroom villas", link: "/property-search?category=villa&beds=3" },
];
