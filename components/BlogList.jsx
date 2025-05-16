import { truncate } from "lodash";
import Link from "next/link";
import React from "react";

export default function BlogList({ posts }) {
  return (
    <section className="py-10 bg-gray-200">
      <div className="container">
        <BlogListTemplate posts={posts} />
      </div>
    </section>
  );
}

export const BlogListTemplate = ({ posts }) => (
  <div className="grid max-w-md grid-cols-1 gap-6 mx-auto lg:grid-cols-3 lg:max-w-full">
    {posts.map((i) => (
      <BlogPostCard
        key={i.slug}
        title={i.title}
        slug={i.slug}
        date={i.date}
        category={i.tags && i.tags.length > 0 && i.tags[0]}
        img={i.featuredImage}
        description={i.description}
      />
    ))}
  </div>
);

const BlogPostCard = ({ title, img, category, date, description, slug }) => {
  return (
    <div className="overflow-hidden bg-white rounded-sm rounded-tr-2xl shadow">
      <div className="relative">
        <Link
          href={`/blog/${slug}`}
          title=""
          className="block aspect-w-4 aspect-h-3"
        >
          <img
            className="object-cover w-full h-[280px]"
            src={img}
            alt={title}
          />
        </Link>

        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-tr-2xl rounded-bl-2xl">
            {category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <span className="block text-sm font-semibold tracking-widest text-gray-500 uppercase">
          {date}
        </span>
        <p className="mt-5 text-2xl font-semibold">
          <Link href={`/blog/${slug}`} className="text-black">
            {title}
          </Link>
        </p>
        <p className="mt-4 text-base text-gray-600">
          {truncate(description, { length: 116 })}
        </p>
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-primary transition-all duration-200 border-b-2 border-transparent hover:border-primary focus:border-primary"
        >
          Continue Reading
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
