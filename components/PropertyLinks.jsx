import Link from "next/link";
import React from "react";

export default function PropertyLinks({
  links = [],
  prices = [],
  locationLinks = [],
}) {
  return (
    <section className="mt-4">
      <h3 className="font-bold font-serif text-3xl uppercase mb-4">
        More Properties
      </h3>
      <div className="grid md:grid-cols-3">
        {links.map((i) => (
          <Link
            href={`/${i.link}`}
            key={i.title}
            className="text-gray-600 text-sm  underline hover:text-primary inline-block mr-4 md:mr-6 mb-4"
          >
            {i.title}
          </Link>
        ))}
      </div>
      <div className="grid md:grid-cols-3">
        {prices.map((i) => (
          <Link
            href={`/${i.link}`}
            key={i.title}
            className="text-gray-600 text-sm underline hover:text-primary inline-block mr-4 md:mr-6 mb-4"
          >
            {i.title}
          </Link>
        ))}
      </div>
      <div className="block">
        {locationLinks.map((i) => (
          <Link
            href={`/${i.link}`}
            key={i.title}
            className="text-gray-600 text-sm underline hover:text-primary inline-block mr-4 md:mr-6 mb-4"
          >
            {i.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
