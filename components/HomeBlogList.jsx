import React from "react";
import { BlogListTemplate } from "./BlogList";

export default function HomeBloglist({ posts }) {
  return (
    <section className="py-10 w-full">
      <div className="container">
        <h2 className="font-bold font-serif uppercase text-3xl mb-10 text-center">
          News & Updates
        </h2>

        <BlogListTemplate posts={posts} />
      </div>
    </section>
  );
}
