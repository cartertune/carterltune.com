'use client'
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";
import { useInView } from "motion/react";
import { FC, useEffect, useRef } from "react";

const Intro: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scope, entranceAnimation, exitAnimation } = useTextRevealAnimation();
  const inView = useInView(scope, { once: true });

  useEffect(() => {
    if (inView) {
      entranceAnimation()
    }
  }, [inView, entranceAnimation, exitAnimation])


  return <section className="section mt-12 md:mt-16 lg:mt-20" id="intro" ref={sectionRef}>
    <div className="container !max-w-full">
      <h2 className="text-4xl md:text-7xl lg:text-8xl lg:w-[80%]" ref={scope}>Developing intuitive applications with clean code and thoughtful design to help your business grow in a world shaped by AI</h2>
    </div>
  </section>;
};

export default Intro;
