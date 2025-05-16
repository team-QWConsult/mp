import Link from "next/link";
import React from "react";
import { Instagram, Youtube } from "react-feather";
import TiktokIcon from "./widgets/TiktokIcon";
import { attributes as data } from "../content/settings.md";

const HomeSocialLinks = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="container mb-6 w-full flex flex-wrap justify-between items-end">
        <h2 className="font-bold font-serif uppercase">
          <span className="text-3xl md:text-4xl text-black/60 block mb-2">
            Follow Us
          </span>
          <span className="text-5xl md:text-6xl text-black block">
            On Social
          </span>
        </h2>
      </div>
      <div className="container w-full grid gap-6 md:grid-cols-3">
        <a
          href={data.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex flex-wrap justify-center"
        >
          <div className="w-full relative h-[200px] md:h-[250px]">
            <img
              src="/img/house-8.jpeg"
              alt="villa for rent in Nairobi"
              className="w-full h-full object-cover"
            />
            <div className="flex items-center justify-center inset-0 absolute bg-black/30 hover:bg-black/10">
              <Youtube className="text-white h-16 w-auto" />
            </div>
          </div>
          <button className="px-6 py-3 text-center inline-block mt-6 bg-charcoal text-white ring-gold hover:ring-2 hover:text-gold ring-offset-4 ">
            Subscribe to YouTube
          </button>
        </a>
        <a
          href={data.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex flex-wrap justify-center"
        >
          <div className="w-full relative h-[200px] md:h-[250px]">
            <img
              src="/img/sophie-maurine-ESmWYVFII9I-unsplash.jpg"
              alt="apartment for rent in Kileleshwa"
              className="w-full h-full object-cover"
            />
            <div className="flex items-center justify-center inset-0 absolute bg-black/30 hover:bg-black/10">
              <Instagram className="text-white h-16 w-auto" />
            </div>
          </div>
          <button className="px-6 py-3 text-center inline-block mt-6 bg-charcoal text-white ring-gold hover:ring-2 hover:text-gold ring-offset-4 ">
            Follow us on Instagram
          </button>
        </a>
        <a
          href={data.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex flex-wrap justify-center"
        >
          <div className="w-full relative h-[200px] md:h-[250px]">
            <img
              src="/img/nairobi-1.jpeg"
              alt="apartment for rent in Nairobi"
              className="w-full h-full object-cover"
            />
            <div className="flex items-center justify-center inset-0 absolute bg-black/30 hover:bg-black/10">
              <TiktokIcon className="text-white fill-white h-16 w-auto" />
            </div>
          </div>
          <button className="px-6 py-3 text-center inline-block mt-6 bg-charcoal text-white ring-gold hover:ring-2 hover:text-gold ring-offset-4 ">
            Follow us on Tiktok
          </button>
        </a>
      </div>
    </section>
  );
};

export default HomeSocialLinks;
