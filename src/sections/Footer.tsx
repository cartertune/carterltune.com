'use client'
import Button from "@/components/Button";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";
import { useInView } from "motion/react";
import { FC, useEffect } from "react";

const navItems = [
  { href: '#', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

const upRightArrowSvg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
</svg>


const Footer: FC = () => {
  const { scope, entranceAnimation } = useTextRevealAnimation()
  const inView = useInView(scope)

  useEffect(() => {
    if (inView) {
      entranceAnimation()
    }
  }, [inView, entranceAnimation])

  const handleClickNavItem = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return <footer className="bg-stone-900 text-white" id="contact">
    <div className="container">
      <div className="section">
        <div className="flex items-center gap-3">
          <div className="size-3 rounded-full bg-green-400 animate-pulse" />
          <span className="uppercase">Seeking new opportunities</span>
        </div>
        <div className="grid md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <h2 className="text-4xl md:text-7xl lg:text-8xl mt-8 font-extralight" ref={scope}>Enough talk. Let&apos;s build something great together.</h2>
            <Button variant="secondary" className="mt-8" iconAfter={<div className="overflow-hidden size-6" onClick={() => { window.open('mailto:cartertune@gmail.com', '_blank') }}>
              <div className="w-12 h-6 flex group-hover/button:-translate-x-1/2 transition-transform duration-500">
                {upRightArrowSvg}
                {upRightArrowSvg}
              </div></div>}>cartertune@gmail.com</Button>
          </div>
          <div className="md:col-span-1">
            <nav className="flex flex-col md:items-end gap-8 mt-16">
              {navItems.map(({ href, label }) => {
                return <a href={href} key={label}><Button variant="text" onClick={() => handleClickNavItem(href)}>{label}</Button></a>
              })}
            </nav>
          </div>
        </div>
      </div >
      <p className="py-16 text-white/30 text-sm">© 2025 Carter L. Tune. All rights reserved.</p>
    </div >
  </footer >;
};

export default Footer;
