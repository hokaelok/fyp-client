import React from 'react';

const Hero = ({ title, subtitle, backgroundColor, textColor }) => {
  return (
    <section className={`w-full ${backgroundColor} ${textColor} py-8`}>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className='text-4xl font-bold'>{title}</h1>
        <p className='mt-4 text-xl underline underline-offset-4'>{subtitle}</p>
      </div>
    </section>
  );
};

export default Hero;
