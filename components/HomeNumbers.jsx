import React from "react";

const data = [
  { title: "Sales Volume", number: "500M" },
  { title: "Listings Count", number: "1.2k" },
  { title: "Listings Value", number: "15B" },
  { title: "Combined Experience", number: "50 Yrs" },
];

const HomeNumbers = () => {
  return (
    <section className="w-full bg-cover bg-no-repeat">
      <div className="bg-white/80 py-14">
        <div className="container text-center">
          <h2 className="font-bold font-serif uppercase text-4xl md:text-5xl lg:text-6xl text-black">
            Proven Perfomance
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {data.map((i) => (
              <div key={i.title} className="bg-charcoal shadow-md p-6">
                <span className="block font-serif text-4xl md:text-7xl mb-3 font-bold text-gold">
                  {i.number}
                </span>
                <p className="uppercase text-xl text-white">{i.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeNumbers;
