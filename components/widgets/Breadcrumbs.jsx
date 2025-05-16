import { truncate } from "lodash";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "react-feather";

const Breadcrumbs = ({ title = "", breadcrumbs = [] }) => {
  return (
    <section className="w-full py-3 bg-gray-100">
      <div className="container max-w-7xl flex items-center">
        {breadcrumbs.map((i) => (
          <React.Fragment key={i.link}>
            <Link
              className="text-primary hover:underline uppercase text-sm"
              href={i.link}
            >
              {i.title}
            </Link>
            <ChevronRight className="mx-2 text-black/60 h-4" />
          </React.Fragment>
        ))}
        <span className="text-black/80 uppercase text-sm overflow-hidden whitespace-nowrap text-ellipsis">
          {truncate(title, { length: 30 })}
        </span>
      </div>
    </section>
  );
};

export default Breadcrumbs;
