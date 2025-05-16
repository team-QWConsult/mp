import Link from "next/link";
import React from "react";
import { attributes as data } from "../content/home.md";

export default function HomeTeam() {
  return (
    <section className="w-full relative">
      <div className="w-full md:w-1/2">
        <img
          src="/img/office.jpg"
          alt="Ann Properties team"
          className="w-full h-[400px] lg:h-[500px] object-cover object-top rounded-tr-3xl"
        />
      </div>
      <div className="md:absolute md:inset-0">
        <div className="container w-full flex md:justify-end">
          <div className="md:w-1/2">
            <div className="px-2 md:px-14 py-14">
              <h2 className="font-bold font-serif mb-6">
                <span className="text-3xl md:text-4xl text-primary/60 block mb-2">
                  About
                </span>
                <span className="text-5xl md:text-6xl text-black block mb-2">
                  The Team
                </span>
              </h2>
              <p className="text-lg text-slate-700">{data.teamCopy}</p>
              <div className="flex mt-4">
                <Link href="/about-us">
                  <button className="px-10 py-3 rounded-tr-xl text-center inline-block mt-4 bg-secondary text-white hover:text-gold">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
