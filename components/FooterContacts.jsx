import React from "react";
import { Mail, MapPin, Phone } from "react-feather";
import { attributes as data } from "../content/settings.md";

export default function FooterContacts() {
  return (
    <section className="py-10">
      <h2 className="font-bold text-4xl md:text-6xl mb-8 font-serif text-center mx-auto max-w-4xl">
        Get in Touch
      </h2>
      <div className="container grid gap-6 md:grid-cols-3">
        <div className="bg-primary rounded-t-3xl p-6">
          <div className="h-[60px] w-[60px] bg-white/10 rounded-2xl -full inline-flex items-center justify-center mb-4">
            <Phone className="h-8 w-auto text-gold" />
          </div>
          <h3 className="uppercase text-white/80 mb-6">Call Us</h3>
          <span className="text-base text-white block mb-3">{data.phone}</span>
          <span className="text-base text-white block mb-3">{data.phone2}</span>
        </div>
        <div className="bg-primary rounded-t-3xl p-6">
          <div className="h-[60px] w-[60px] bg-white/10 rounded-2xl -full inline-flex items-center justify-center mb-4">
            <Mail className="h-8 w-auto text-gold" />
          </div>
          <h3 className="uppercase text-white/80 mb-6">Message Us</h3>
          <span className="text-base text-white">{data.email}</span>
        </div>
        <div className="bg-primary rounded-t-3xl p-6">
          <div className="h-[60px] w-[60px] bg-white/10 rounded-2xl -full inline-flex items-center justify-center mb-4">
            <MapPin className="h-8 w-auto text-gold" />
          </div>
          <h3 className="uppercase text-white/80 mb-6">Visit Us</h3>
          <span className="text-base text-white">{data.address}</span>
        </div>
      </div>
    </section>
  );
}
