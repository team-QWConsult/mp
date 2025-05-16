import Link from "next/link";
import React from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Breadcrumbs from "../components/widgets/Breadcrumbs";
import { attributes as data } from "../content/locations.md";
import FooterContacts from "../components/FooterContacts";
import { snakeCase } from "lodash";
import SEO from "../components/SEO";

export default function LocationsPage() {
  return (
    <>
      <SEO
        title="Property Locations"
        description="Explore prime real estate locations with Zurafa Properties. From vibrant urban centers to serene suburban neighborhoods across Kenya, we offer a diverse range of properties for sale and rent. Discover the perfect home or investment opportunity in Nairobi, Mombasa, Kisumu, and beyond. Find your ideal property in the best locations today."
        slug="/locations"
      />
      <Nav />
      <Breadcrumbs
        title="Locations"
        breadcrumbs={[
          { title: "Home", link: "/" },
          { title: "Properties", link: "/properties" },
        ]}
      />
      <section className="pt-14 pb-8 container max-w-5xl">
        <h1 className="font-bold uppercase text-5xl md:text-6xl mb-5 font-serif text-center mx-auto max-w-4xl">
          Top Locations
        </h1>
      </section>
      <div className="container w-full grid gap-6 md:grid-cols-3 mb-8">
        {data.locations.map((i) => (
          <Link
            href={`/properties-for-rent-in-${snakeCase(i.name)}`}
            className="block relative"
            key={i.name}
          >
            <img
              src={i.img}
              alt={i.name}
              className="h-[120px] w-full object-cover block"
            />
            <div className="absolute inset-0 bg-black/40 hover:bg-black/20 flex items-end p-4">
              <div>
                <h3 className="font-bold text-white text-2xl">{i.name}</h3>
                <p className="underline text-white/80">
                  Properties for rent in {i.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <FooterContacts />
      <Footer />
    </>
  );
}
