'use client';

import { FC, useRef, useState } from "react";
import noelleImg from "@/assets/images/noelle.jpeg";
import panpanImg from "@/assets/images/panpan.jpeg";
import harshalImg from "@/assets/images/harshal.jpeg";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import TestimonialCard from "@/components/TestimonialCard";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const testimonials = [
  {
    name: "Noelle Claessens",
    company: "Pietra",
    role: "Head of Engineering & Product",
    quote:
      "Carter delivers high-quality, non-buggy code with minimal oversight and quicklytackles complex challenges",
    image: noelleImg,
    imagePositionY: 0.2,
  },
  {
    name: "Pan Pan",
    company: "Pietra",
    role: "Co-Founder & CTO",
    quote:
      "Carter is a proactive engineer who quickly improves both product and infrastructure.",
    image: panpanImg,
    imagePositionY: 0.1,
  },
  {
    name: "Harshal Singh",
    company: "Troav",
    role: "Co-Founder & CEO",
    quote:
      "A team player with a teaching spirit, always willing to help and mentor others.",
    image: harshalImg,
    imagePositionY: 0.55,
  },
];

const arrowLeftSvg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>

const arrowRightSvg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg>


const Testimonials: FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ['start end', 'end start']
  });

  const transformTop = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const transformBottom = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const handleClickPrev = () => {
    const nextIndex = testimonialIndex === 0 ? testimonials.length - 1 : testimonialIndex - 1;
    setTestimonialIndex(nextIndex);
  }

  const handleClickNext = () => {
    const nextIndex = testimonialIndex === testimonials.length - 1 ? 0 : testimonialIndex + 1;
    setTestimonialIndex(nextIndex);
  }

  return <section className="section" id="testimonials">
    <h2 className="text-4xl md:text-7xl lg:text-8xl flex flex-col gap-4" ref={titleRef}>
      <motion.span className="whitespace-nowrap overflow-hidden" style={{ x: transformTop }}>Some nice words from my past employers</motion.span>
      <motion.span className="whitespace-nowrap self-end text-red-orange-500" style={{ x: transformBottom }}>Some nice words from my past employers</motion.span>
    </h2>
    <div className="container">
      <div className="mt-20">
        <AnimatePresence mode="wait" initial={false}>
          {testimonials.map(({ name, company, role, quote, image, imagePositionY }, index) => {
            return index === testimonialIndex && <TestimonialCard key={name} name={name} company={company} role={role} quote={quote} image={image} imagePositionY={imagePositionY} />
          })}
        </AnimatePresence>
      </div>
      <div className="flex gap-4 mt-6 lg:mt-10">
        <button className="border border-stone-400 size-11 inline-flex items-center justify-center rounded-full hover:bg-red-orange-500 hover:text-white hover:border-red-orange-500 transition-all duration-300" onClick={handleClickPrev}>{arrowLeftSvg}</button>
        <button className="border border-stone-400 size-11 inline-flex items-center justify-center rounded-full hover:bg-red-orange-500 hover:text-white hover:border-red-orange-500 transition-colors duration-300" onClick={handleClickNext}>{arrowRightSvg}</button>
      </div>
    </div>
  </section>;
};

export default Testimonials;
