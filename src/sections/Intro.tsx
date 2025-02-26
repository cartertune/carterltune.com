'use client'
import { stagger, useAnimate, useInView } from "motion/react";
import { FC, useEffect } from "react";
import SplitType from "split-type";

const Intro: FC = () => {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true });

  useEffect(() => {
    new SplitType(scope.current.querySelector('h2') as HTMLElement, { types: 'words,lines', tagName: 'span' });
  }, [scope])


  useEffect(() => {
    if (inView) {
      animate(scope.current.querySelectorAll('.word'), { transform: 'translateY(0)' }, { duration: .5, delay: stagger(0.2) })
    }
  }, [inView, scope, animate])

  return <section className="section mt-12 md:mt-16 lg:mt-20" id="intro" ref={scope}>
    <div className="container !max-w-full">
      <h2 className="text-4xl md:text-7xl lg:text-8xl lg:w-[80%]">Building beautiful websites with clean code and thoughtful design to help your business grow and stand out online</h2>
    </div>
  </section>;
};

export default Intro;
