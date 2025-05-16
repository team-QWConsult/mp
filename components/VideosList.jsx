import Link from "next/link";
import React from "react";
import { Play } from "react-feather";

export default function VideosList({ videos = [] }) {
  return (
    <section className="py-10 bg-primary text-white">
      <div className="container mb-8 w-full flex flex-wrap justify-between items-end">
        <h2 className="font-bold font-serif uppercase">
          <span className="text-3xl md:text-4xl text-white/60 block mb-2">
            Property
          </span>
          <span className="text-5xl md:text-6xl text-gold block mb-2">
            Videos
          </span>
        </h2>
      </div>
      <div className="container w-full grid gap-4 md:grid-cols-2">
        {videos.map((i) => (
          <Link
            key={i.title}
            href={`/videos/${i.slug}`}
            className="block rounded bg-white/10 relative"
          >
            <img
              src={i.img}
              alt={i.title}
              className="w-full h-[280px] object-cover rounded-t"
            />
            <Play className="h-12 w-auto left-[45%] top-[40%] absolute" />
            <div className="p-4">
              <h3>{i.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
