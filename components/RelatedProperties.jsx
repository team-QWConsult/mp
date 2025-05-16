import { kebabCase } from "lodash";
import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import PropertyLinks from "./PropertyLinks";
import { listingsAPI } from "../utils/listingsAPI";

export default function RelatedProperties({ propertyType, offer, topLinks }) {
  const [featuredListings, setFeaturedListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const res = await listingsAPI({ propertyType, offer, limit: 3 });
      console.log(res);
      setFeaturedListings(res);
    };

    fetchListings();

    return () => {};
  }, [offer, propertyType]);

  return (
    <section className="py-6 bg-gray-200">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold font-serif uppercase text-start mb-5">
          More Exclusive Properties
        </h2>
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          {featuredListings &&
            featuredListings.length &&
            featuredListings.map((i) => <ListingCard key={i.id} data={i} />)}
        </div>
        <PropertyLinks {...topLinks} />
      </div>
    </section>
  );
}
