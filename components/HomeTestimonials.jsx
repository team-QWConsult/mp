import React, { useState } from "react";
import QuoteIcon from "./widgets/QuoteIcon";
import { attributes as data } from "../content/testimonials.md";

export default function HomeTestimonials() {
  return (
    <div className="container py-10 lg:py-14">
      <h2 className="font-bold font-serif uppercase mb-4">
        <span className="text-4xl md:text-5xl text-secondary inline-block mr-2">
          Client
        </span>
        <span className="text-4xl md:text-5xl text-accent">Testimonials</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.testimonials.map((i) => (
          <TestimonialCard
            key={i.name}
            name={i.name}
            quote={i.quote}
            summary={i.summary}
            title={i.title}
          />
        ))}
      </div>
    </div>
  );
}

const TestimonialCard = ({ name, summary, quote, title }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="flex-auto p-4 md:p-6 pb-0 md:pb-0">
        <QuoteIcon className="h-14 w-auto opacity-20" />
        <p className="text-base text-gray-800 md:text-lg mt-2">
          {!showMore && <i>{summary}...</i>}
          <button
            onClick={() => setShowMore(!showMore)}
            className="underline font-semibold text-secondary italic"
          >
            {showMore ? "Show Summary" : "Read More"}
          </button>
          <div
            className={`${
              showMore ? "block" : "hidden"
            } overflow-hidden transition-all duration-500`}
          >
            <em>{quote}</em>
          </div>
        </p>
      </div>

      <div className="p-4 rounded-b-xl md:px-6">
        <h3 className="text-sm font-semibold text-gray-800 sm:text-base">
          {name}
        </h3>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
};
