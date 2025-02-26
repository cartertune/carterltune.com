'use client'
import { FC, HTMLAttributes, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";
import { motion, usePresence } from "motion/react";


interface TestimonialCardProps {
  name: string;
  company: string;
  role: string;
  quote: string;
  imagePositionY: number;
  image: StaticImageData;
  className?: string;
}

const TestimonialCard: FC<TestimonialCardProps & HTMLAttributes<HTMLDivElement>> = ({ name, company, role, quote, image, imagePositionY, className, ...rest }) => {

  const { scope: quoteScope, entranceAnimation: quoteEntranceAnimate, exitAnimation: quoteExitAnimate } = useTextRevealAnimation()
  const { scope: citeScope, entranceAnimation: citeEntranceAnimate, exitAnimation: citeExitAnimate } = useTextRevealAnimation()
  const [isPresent, safeToRemove] = usePresence()

  useEffect(() => {
    if (isPresent) {
      quoteEntranceAnimate().then(() => {
        citeEntranceAnimate()
      })
    } else {
      Promise.all([quoteExitAnimate(), citeExitAnimate()]).then(() => {
        safeToRemove()
      })
    }
  }, [citeEntranceAnimate, quoteEntranceAnimate, citeExitAnimate, quoteExitAnimate, isPresent, safeToRemove])

  return <div className={twMerge("grid md:grid-cols-5 md:gap-8 lg:gap-16 md:items-center", className)} {...rest}>
    <div className='aspect-square md:aspect-[9/16] md:col-span-2 relative'>
      <motion.div className="absolute h-full bg-stone-900" initial={{ width: '100%' }} animate={{ width: 0 }} exit={{ width: '100%' }} transition={{ duration: 0.5 }} />
      <Image src={image} alt={`${name}-image`} className="size-full object-cover" style={{ objectPosition: `50% ${imagePositionY * 100}%` }} />
    </div>
    <blockquote className="md:col-span-3">
      <div className="text-3xl md:text-5xl lg:text-6xl mt-8 md:mt-0" ref={quoteScope}>
        <span>&ldquo;</span>
        {quote}
        <span>&rdquo;</span>
      </div>
      <cite className="mt-4 md:mt-8 not-italic md:text-lg lg:text-xl block" ref={citeScope}>{name}, {role} at {company}</cite>
    </blockquote>
  </div >
};

export default TestimonialCard;
