'use client'
import { FC, useEffect, useRef } from "react";
import Image from "next/image";
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import heroImage from "@/assets/images/hero-image.jpeg";
import Button from "@/components/Button";
import SplitType from "split-type";
import { useAnimate, motion, stagger, useScroll, useTransform } from "motion/react";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";

const chevronDoubleDownSVG = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
</svg>

const Hero: FC = () => {
  const scrollingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollingRef, offset: ['start end', 'end end'] });

  // 240% = transition from 5 columns to 12 columns
  const portraitWidth = useTransform(scrollYProgress, [0, 1], ['100%', '240%']);

  const { scope: titleScope, entranceAnimation: titleAnimate } = useTextRevealAnimation()

  useEffect(() => {
    titleAnimate()
  }, [titleAnimate])

  return <section>
    <div className="grid md:grid-cols-12 md:h-screen items-stretch sticky top-0">
      <div className="md:col-span-7 flex flex-col justify-center">
        <div className="container !max-w-full">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-5xl md:text-6xl lg:text-7xl mt-40 md:mt-0"
            ref={titleScope}
          >
            Crafting digital experiences through code and creative design
          </motion.h1>
          <div className="flex flex-col md:flex-row mt-10 items-start md:items-center gap-6">
            <motion.div initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: 1.75 }}>
              <Button variant="secondary" iconAfter={
                <div className="overflow-hidden size-5">
                  <div className="h-5 w-10 flex group-hover/button:-translate-x-1/2 transition-transform duration-500">
                    {chevronDoubleDownSVG}
                    {chevronDoubleDownSVG}
                  </div>
                </div>}><span>View My Work</span></Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: 2.2 }}>
              <Button variant="text">Let&apos;s Talk</Button>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="md:col-span-5 relative">
        <motion.div className="mt-20 md:mt-0 md:size-full md:absolute md:right-0 max-md:!w-full" style={{ width: portraitWidth }}>
          <Image src={heroImage} alt="My portriat" className="grayscale size-full object-cover object-[25%]" />
        </motion.div>
      </div>
    </div>
    <div className="md:h-[200vh]" ref={scrollingRef} />
  </section>
};

export default Hero;
