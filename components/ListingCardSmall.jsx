/* eslint-disable @next/next/no-img-element */
import { kebabCase, truncate, upperFirst, includes } from "lodash";
import Link from "next/link";
import React from "react";
import { numberWithCommas } from "../utils/numberWithCommas";
import { rentIDs } from "./properties/constants";

const ListingCard = ({ data }) => {
  const featuredImg = data.images[0];
  let slug = `/properties/${data.slug}-${data.id}`;

  return (
    <Link href={slug} className="w-full group h-[400px] relative group">
      <img
        src={featuredImg.link}
        alt={data.title}
        className="w-full h-[300px] group-hover:h-full object-cover"
      />
      <div className="absolute top-0 right-0 w-[150px] h-[150px] overflow-hidden uppercase z-30">
        <span className="-left-[25px] top-[30px] rotate-45 block w-[260px] p-[6px_0] text-white text-center bg-[#f19832] absolute">
          {includes(rentIDs, data.property_status) ? "For Rent" : "For Sale"}
        </span>
      </div>
      <div className="absolute inset-0 flex items-end">
        <div className="bg-white group-hover:bg-darkBg/80 group-hover:text-white p-4 w-full group-hover:h-full transition-all duration-300">
          <span className="text-2xl font-semibold">
            {data.price_postfix || "KSH"}{" "}
            {data.price ? numberWithCommas(data.price) : "0"}
          </span>
          <span className="text text-gray-700 group-hover:text-white/80 block whitespace-nowrap overflow-hidden text-ellipsis">
            {data.address}
          </span>
          <div className="flex flex-wrap items-center mt-3">
            <div className="flex items-center mr-8">
              <img
                src="/img/bedroom.png"
                alt="bedrooms"
                className="h-7 w-auto mr-2 group-hover:invert"
              />
              <span className="text-base">{data.bedroom_count || "-"}</span>
            </div>
            <div className="flex items-center mr-8">
              <img
                src="/img/bathtub.png"
                alt="bathrooms"
                className="h-6 w-auto mr-2 group-hover:invert"
              />
              <span className="text-base">{data.bathroom_count || "-"}</span>
            </div>
            <div className="flex items-center mr-8">
              <img
                src="/img/size.png"
                alt="size"
                className="h-6 w-auto mr-2 group-hover:invert"
              />
              <span className="text-base">
                {data.size + " " + data.size_postfix || "-"}
              </span>
            </div>
          </div>
          <div className="h-0 overflow-hidden group-hover:h-auto">
            <h2 className="font-bold text-lg mb-2 mt-6">{data.title}</h2>
            <article
              className="text-gray-800 group-hover:text-white/80 text-xs"
              dangerouslySetInnerHTML={{ __html: data.excerpt.rendered }}
            />
            <div className="flex">
              <button className="px-6 py-3 mr-5 text-center inline-block mt-6 bg-primary hover:bg-secondary text-white">
                More Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
