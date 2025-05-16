/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useKeenSlider } from "keen-slider/react";
import { attributes } from "../content/home.md";

import "keen-slider/keen-slider.min.css";
import SearchForm from "./SearchForm";

const Hero = () => {
  const { slider } = attributes;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      slides: {
        perView: 1,
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);

          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        slider.on("created", () => {
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <section className="relative w-full">
      <div ref={sliderRef} className="keen-slider h-[calc(100vh-100px)] w-full">
        {slider.map((i, index) => (
          <img
            src={i}
            key={i}
            alt="house"
            className={`w-full h-full object-cover keen-slider__slide number-slide${
              index + 1
            }`}
          />
        ))}
      </div>
      <div className="w-full absolute left-0 top-0 bottom-0 bg-black/40 flex flex-col justify-center">
        <div className="container w-full">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold font-serif mb-4 max-w-3xl mx-auto text-center text-4xl md:text-4xl lg:text-5xl text-white">
              {attributes.title}
            </h1>
            <p className="text-center text-xl mx-auto max-w-3xl text-white">
              {attributes.heroCopy}
            </p>
          </div>
        </div>
        <div className="w-full">
          <SearchForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;
