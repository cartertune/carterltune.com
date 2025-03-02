'use client'
import Button from "@/components/Button";
import { FC, LegacyRef, useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion"

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const navItems = [
  {
    label: "About",
    href: "#intro",
  },
  {
    label: "Selected Works",
    href: "#projects",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

const menuIcon = (topLineScope: LegacyRef<SVGRectElement>, bottomLineScope: LegacyRef<SVGRectElement>) => {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.rect ref={topLineScope} x="3" y="7" width="18" height="2" fill="currentColor" style={{
      transformOrigin: '12px 8px',
    }} />
    <motion.rect ref={bottomLineScope} x="3" y="15" width="18" height="2" fill="currentColor" style={{
      transformOrigin: '12px 16px',
    }} />
  </svg>
}

const upRightArrowSvg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
</svg>


const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [topLineScope, topLineAnimate] = useAnimate();
  const [bottomLineScope, bottomLineAnimate] = useAnimate();
  const [navScope, navAnimate] = useAnimate();

  useEffect(() => {
    if (isOpen) {
      topLineAnimate([[topLineScope.current, { translateY: 4 }], [topLineScope.current, { rotate: 45 }]])
      bottomLineAnimate([[bottomLineScope.current, { translateY: -4 }], [bottomLineScope.current, { rotate: -45 }]])
      navAnimate(navScope.current, { height: '100%' }, { duration: 0.7 })
    } else {
      topLineAnimate([[topLineScope.current, { rotate: 0 }], [topLineScope.current, { translateY: 0 }]])
      bottomLineAnimate([[bottomLineScope.current, { rotate: 0 }], [bottomLineScope.current, { translateY: 0 }]])
      navAnimate(navScope.current, { height: '0' }, { duration: 0.7 })
    }
  }, [isOpen, topLineAnimate, bottomLineAnimate, topLineScope, bottomLineScope, navAnimate, navScope])

  const handleNavItemClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setIsOpen(false)
    const element = document.getElementById(event.currentTarget.href.split('#')[1])
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return <header>
    <div className="fixed top-0 left-0 w-full h-0 overflow-hidden z-10 bg-stone-900" ref={navScope}>
      <nav className='mt-20 flex flex-col'>
        {navItems.map(({ label, href }) => (
          <a href={href} key={label} onClick={handleNavItemClick} className='text-stone-200 border-t last:border-b border-stone-800 py-8 group/nav-item relative isolate'>
            <div className="container !max-w-full flex items-center justify-between">
              <span className="text-3xl group-hover/nav-item:pl-4 transition-all duration-500">
                {label}
              </span>
              {upRightArrowSvg}
            </div>
            <div className="absolute bottom-0 w-full h-0 bg-stone-800 group-hover/nav-item:h-full transition-all duration-500 -z-10" />
          </a>
        ))}
      </nav>
    </div>
    <div className="fixed top-0 left-0 w-full mix-blend-difference backdrop-blur-md z-10">
      <div className="container !max-w-full">
        <div className="flex justify-between h-20 items-center">
          <div>
            <a href="/">
              <span className="text-xl font-bold uppercase text-white">Carter&nbsp; Tune</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="fixed top-0 left-0 w-full z-10">
      <div className="container !max-w-full">
        <div className="flex justify-end h-20 items-center">
          <div className="flex items-center gap-4">
            <div onClick={() => { setIsOpen(!isOpen) }} className="size-11 border bg-stone-200 border-stone-400 rounded-full inline-flex items-center justify-center">
              {menuIcon(topLineScope, bottomLineScope)}
            </div>
            <Button variant="primary" className="hidden md:inline-flex" onClick={() => { window.open('mailto:cartertune@gmail.com', '_blank') }}>Contact Me</Button>
          </div>
        </div>
      </div>
    </div>
  </header >;
};

export default Header;
