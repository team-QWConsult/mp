import Link from "next/link";
import React from "react";
import ContactCTA from "../components/ContactCTA";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Breadcrumbs from "../components/widgets/Breadcrumbs";
import { attributes as data } from "../content/settings.md";
import { attributes as contactData } from "../content/contact-us.md";
import { Mail, MapPin, Phone } from "react-feather";
import SEO from "../components/SEO";

export default function ContactUsPage() {
  return (
    <>
      <SEO
        slug="/contact-us"
        title="Contact Us"
        description="Have questions or need assistance with buying, selling, or renting property? Get in touch with Zurafa Properties today! Our dedicated team is here to provide expert guidance and personalized real estate solutions. Contact us via phone, email, or visit our offices for professional support in navigating Kenya real estate market."
      />
      <Nav />
      <Breadcrumbs
        title="Contact Us"
        breadcrumbs={[{ title: "Home", link: "/" }]}
      />
      <section className="pt-14 pb-16 container max-w-5xl">
        <h1 className="font-bold  text-5xl md:text-6xl mb-10 font-serif text-center mx-auto max-w-4xl">
          Contact Us
        </h1>
        <p className="mx-auto md:text-xl text-center max-w-4xl">
          {contactData.copy}
        </p>
      </section>
      <section className="container grid gap-6 md:grid-cols-2">
        <div className="container grid gap-6 pb-8">
          <div className="bg-primary rounded-3xl rounded-bl-none p-6">
            <div className="h-[48px] w-[48px] bg-white/10 rounded-full inline-flex items-center justify-center mb-4">
              <Phone className="h-6 w-auto text-gold" />
            </div>
            <h3 className="uppercase text-white/80 mb-6">Call Us</h3>
            <span className="text-base text-white block mb-3">
              {data.phone}
            </span>
            <span className="text-base text-white block mb-3">
              {data.phone2}
            </span>
          </div>
          <div className="bg-primary rounded-3xl rounded-bl-none p-6">
            <div className="h-[48px] w-[48px] bg-white/10 rounded-full inline-flex items-center justify-center mb-4">
              <Mail className="h-6 w-auto text-gold" />
            </div>
            <h3 className="uppercase text-white/80 mb-6">Message Us</h3>
            <span className="text-base text-white">{data.email}</span>
          </div>
          <div className="bg-primary rounded-3xl rounded-bl-none p-6">
            <div className="h-[48px] w-[48px] bg-white/10 rounded-full inline-flex items-center justify-center mb-4">
              <MapPin className="h-6 w-auto text-gold" />
            </div>
            <h3 className="uppercase text-white/80 mb-6">Visit Us</h3>
            <span className="text-base text-white">{data.address}</span>
          </div>
        </div>
        <ContactCTA />
      </section>
      <Footer />
    </>
  );
}
