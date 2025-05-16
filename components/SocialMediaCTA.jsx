import React from "react";
import { ArrowUpRight, Facebook, Instagram, Youtube } from "react-feather";
import TiktokIcon from "./widgets/TiktokIcon";
import { attributes as data } from "../content/settings.md";

export default function SocialMediaCTA() {
  return (
    <section className="py-4">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-4">
        <a
          href={data.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-tr-2xl rounded-sm p-4 md:p-6 bg-primary hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500"
        >
          <Youtube className="text-white h-10 w-auto mb-4" />
          <div className="flex justify-between items-end">
            <h3 className="text-2xl text-white">Youtube</h3>
            <ArrowUpRight className="text-white" />
          </div>
        </a>
        <a
          href={data.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-tr-2xl rounded-sm p-4 md:p-6 bg-primary hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500"
        >
          <TiktokIcon className="fill-white h-10 w-auto mb-4" />
          <div className="flex justify-between items-end">
            <h3 className="text-2xl text-white">Tiktok</h3>
            <ArrowUpRight className="text-white" />
          </div>
        </a>
        <a
          href={data.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-tr-2xl rounded-sm p-4 md:p-6 bg-primary hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500"
        >
          <Instagram className="text-white h-10 w-auto mb-4" />
          <div className="flex justify-between items-end">
            <h3 className="text-2xl text-white">Instagram</h3>
            <ArrowUpRight className="text-white" />
          </div>
        </a>
        <a
          href={data.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-tr-2xl rounded-sm p-4 md:p-6 bg-primary hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500"
        >
          <Facebook className="text-white h-10 w-auto mb-4" />
          <div className="flex justify-between items-end">
            <h3 className="text-2xl text-white">Facebook</h3>
            <ArrowUpRight className="text-white" />
          </div>
        </a>
      </div>
    </section>
  );
}
