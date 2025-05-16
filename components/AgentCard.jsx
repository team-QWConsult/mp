import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Mail, Phone, User, X } from "react-feather";
import WhatsAppIcon from "./widgets/WhatsAppIcon";
import { attributes as settings } from "../content/settings.md";

export default function AgentCard({
  title = "",
  phone,
  focus,
  closeFocus,
  teamID,
  agentID,
  listingRef,
}) {
  const router = useRouter();

  return (
    <div
      className={
        focus
          ? "fixed inset-0 z-[1000] bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4"
          : "w-full"
      }
    >
      <div
        className={`bg-white text-black border p-4 ${
          focus && "w-full md:w-[400px]"
        }`}
      >
        <div className="px-4 -mx-4 -my-4 py-3 flex items-center justify-between border-b mb-4">
          <div className="flex items-center">
            <User className="mr-4" />
            <span className="text-gray-600 uppercase">Listing Agent</span>
          </div>
          {focus && (
            <button className="p-1">
              <X className="text-black" onClick={closeFocus} />
            </button>
          )}
        </div>
        <div className="w-[100px] h-[100px] mx-auto rounded-full flex items-center justify-center text-white bg-slate-700">
          <span className="font-bold text-3xl uppercase">
            {settings.siteName[0]}
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold text-center mb-4">
            {settings.siteName}
          </h3>

          <a
            href={`tel:${settings.phone}`}
            className="flex items-center justify-center rounded-sm mb-2 text-black px-6 py-3 w-full text-center bg-gold hover:bg-charcoal hover:text-white"
          >
            <Phone className="h-5 w-auto mr-3" />
            <span>{settings.phone}</span>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://wa.me/${settings.phone}?text=${encodeURIComponent(
              "I am interested in your property: Ref - " + listingRef
            )}`}
            className="flex items-center justify-center rounded-sm mb-2 text-black px-6 py-3 w-full text-center bg-gold hover:bg-charcoal hover:text-white"
          >
            <WhatsAppIcon className="h-5 mr-3" />
            <span>WhatsApp</span>
          </a>
          <a
            href={`mailto:${settings.email}?subject=${encodeURIComponent(
              "I am interested in your property: Ref - " + listingRef
            )}&body=${encodeURIComponent(
              "Please contact me about your listing"
            )}`}
            className="flex items-center justify-center rounded-sm mb-2 text-black px-6 py-3 w-full text-center bg-gold hover:bg-charcoal hover:text-white"
          >
            <Mail className="h-5 w-auto mr-3 shrink-0" />
            <p>{settings.email}</p>
          </a>
        </div>
      </div>
    </div>
  );
}
