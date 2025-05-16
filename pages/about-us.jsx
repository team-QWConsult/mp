import Link from "next/link";
import React from "react";
import ContactCTA from "../components/ContactCTA";
import Footer from "../components/Footer";
import FooterContacts from "../components/FooterContacts";
import Nav from "../components/Nav";
import Breadcrumbs from "../components/widgets/Breadcrumbs";
import PageHero from "../components/widgets/PageHero";
import { attributes as data, html } from "../content/about.md";
import SEO from "../components/SEO";

export default function AboutUsPage() {
  return (
    <>
      <SEO
        slug="/about-us"
        title="About Us"
        description="Zurafa Properties is a leading real estate company in Kenya, dedicated to helping clients buy, sell, and rent properties with confidence. With a deep understanding of the local market, we offer personalized services to meet every client's unique needs. From residential homes to commercial spaces, our team of experts is committed to delivering excellence, integrity, and transparency."
      />
      <Nav />
      <Breadcrumbs
        title="About Us"
        breadcrumbs={[{ title: "Home", link: "/" }]}
      />
      <section className="py-14 container max-w-5xl">
        <h1 className="font-bold uppercase text-5xl md:text-6xl mb-5 font-serif text-center mx-auto max-w-4xl">
          About Us
        </h1>
        <p className="mx-auto md:text-xl text-center max-w-4xl pb-8">
          {data.copy}
        </p>
        <Link
          href="/contact-us"
          className="group px-6 py-6 border-4 border-white bg-primary -mb-24 rounded-xl relative z-10 hover:bg-primary uppercase w-[200px] mx-auto flex items-center justify-center text-white"
        >
          Contact Us
        </Link>
      </section>
      <img
        src="/img/westlands.jpg"
        alt="nairobi properties"
        className="w-full h-[440px] object-cover"
      />
      <div className="container max-w-3xl mx-auto py-16">
        <article
          className="prose prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        ></article>
      </div>

      <FooterContacts />
      <Footer />
    </>
  );
}
