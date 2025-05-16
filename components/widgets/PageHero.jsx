import React from "react";
import Breadcrumbs from "./Breadcrumbs";

export default function PageHero({
  img = "/img/dane-deaner-_-KLkj7on_c-unsplash.jpg",
  title,
  subTitle,
  breadcrumbs,
}) {
  return (
    <section className="relative h-[400px] w-full">
      <img src={img} alt={title} className="object-cover h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white/90 flex items-end">
        <div className="container w-full">
          <h1 className="font-bold text-black text-5xl lg:text-7xl mb-2 uppercase">
            {title}
          </h1>
          {subTitle && <p className="text-black/80 text-sm mb-2">{subTitle}</p>}
          {breadcrumbs && (
            <Breadcrumbs title={title} breadcrumbs={breadcrumbs} />
          )}
        </div>
      </div>
    </section>
  );
}
