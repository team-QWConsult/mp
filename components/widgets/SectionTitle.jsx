import React from "react";

const SectionTitle = ({ number, title, copy }) => {
  return (
    <div className="w-full py-6 flex flex-wrap sm:flex-nowrap gap-4 items-center mt-16">
      <div className="h-[64px] w-[64px] rounded-full bg-primary flex items-center justify-center">
        <span className="text-xl text-white font-bold">{number}</span>
      </div>
      <div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p>{copy}</p>
      </div>
    </div>
  );
};

export default SectionTitle;
