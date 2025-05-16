import { kebabCase } from "lodash";
import Link from "next/link";
import React from "react";
import Footer from "../../components/Footer";
import FooterContacts from "../../components/FooterContacts";
import Nav from "../../components/Nav";
import TrendingSearch from "../../components/TrendingSearch";
import Breadcrumbs from "../../components/widgets/Breadcrumbs";
import { getAllBlogPosts } from "../../utils/getBlogPosts";
import BlogList from "../../components/BlogList";
import SocialMediaCTA from "../../components/SocialMediaCTA";
import SEO from "../../components/SEO";

const links = ["News", "Videos", "New Listings", "Projects"];

export default function Blog({ blogs }) {
  return (
    <>
      <SEO
        title="Properties Magazine"
        description="Stay updated with the latest real estate trends, property investment tips, and expert insights at Dreamfort Realtors. Explore guides on buying, selling, and renting homes in Kenya and beyond. Visit our blog today"
        slug="/blog"
      />
      <Nav />
      <Breadcrumbs title="Media" breadcrumbs={[{ title: "Home", link: "/" }]} />
      <section className="relative">
        <img
          src="/img/brad-knight-huWlb1NP67w-unsplash.jpg"
          alt="nairobi"
          className="w-full h-[220px] object-cover block"
        />
        <div className="absolute inset-0 bg-black/30 text-white flex items-center">
          <h1 className="font-bold  text-4xl md:text-6xl md:leading-[80px] font-serif text-center mx-auto max-w-4xl">
            Properties News
          </h1>
        </div>
      </section>

      <BlogList posts={blogs} />
      <FooterContacts />
      <TrendingSearch />
      <SocialMediaCTA />
      <Footer />
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const blogs = getAllBlogPosts();

  return {
    props: {
      blogs,
    },
  };
};
