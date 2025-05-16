import { kebabCase, snakeCase } from "lodash";
import Link from "next/link";
import React from "react";
import { ArrowRight, ArrowUpRight, ChevronRight, MapPin } from "react-feather";
import { attributes } from "../content/locations.md";
import { attributes as seo } from "../content/seo.md";

const TopLocations = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mb-10 w-full flex flex-wrap justify-between items-end">
        <h2 className="font-bold font-serif uppercase text-3xl">
          Top Locations
        </h2>
      </div>

      <div className="grid container w-full gap-4 grid-cols-2 md:grid-cols-4">
        {attributes.locations.map((i) => (
          <Link
            href={`/properties-for-sale-in-${snakeCase(i.name)}`}
            className="block relative"
            key={i.name}
          >
            <img
              src={i.img}
              alt=""
              className="h-[240px] w-full object-cover rounded-tr-3xl"
            />
            <div className="rounded-tr-3xl p-3 md:p-4 bg-gradient-to-b from-transparent via-black/40 to-black/70 absolute inset-0 flex flex-col justify-end">
              <div>
                <span className="text-white/80 text-s">Properties in</span>
                <h3 className=" text-white text-2xl uppercase">{i.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="container w-full grid gap-4 md:grid-cols-3 mt-10">
        {attributes.allLocations.map((i) => (
          <Link
            href={`/land_plot-for-sale-in-${kebabCase(i)}`}
            className="block relative hover:text-primary hover:underline"
            key={i}
          >
            <h3 className=" text-black text-base">Plots for sale in {i}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopLocations;
