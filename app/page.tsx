"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Model from "@/components/Model";
import Preloader from "@/components/Preloader";
import Link from "next/link";
import Mail from "@/components/SVG/Mail";
import Github from "@/components/SVG/Github";
import Telegram from "@/components/SVG/Telegram";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: false });

export default function Main() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollTimelineEnd, setScrollTimelineEnd] = useState("top -400px");
  const containerRef = useRef(null);

  useEffect(() => {
    const updateScrollTimelineEnd = () => {
      setScrollTimelineEnd(window.outerWidth < 850 ? "top -100px" : "top -400px");
    };

    updateScrollTimelineEnd();
    window.addEventListener("resize", updateScrollTimelineEnd);

    return () => {
      window.removeEventListener("resize", updateScrollTimelineEnd);
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 0%",
        end: scrollTimelineEnd,
        scrub: 1,
        pin: true,
      },
    });

    tl.to(".title", { autoAlpha: 0, duration: 3 });

    const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[href="#"]');
    links.forEach((el) => {
      el.addEventListener("click", (e) => e.preventDefault());
    });

    return () => {
      tl.kill(); 
      ScrollTrigger.getById("main-scroll-trigger")?.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className={'min-h-[100dvh] overflow-x-hidden main_block'}>
      <Preloader isLoaded={isLoaded} />
      <Model setIsLoaded={setIsLoaded} />
      <div ref={containerRef} className={`animation_block w-[100dvw] relative h-[200vh]`}>
        <header className="flex items-center justify-between py-4 px-12">
          <span>logo</span>
          <nav className="flex items-center gap-6">
            <a className="cursor-pointer" href="https://github.com/ksunwy" target="_blank" rel="noopener noreferrer"><Github width="32" height="32" /></a>
            <a className="cursor-pointer" href="https://t.me/ksunnw" target="_blank" rel="noopener noreferrer"><Telegram width="32" height="32" /></a>
            <a className="cursor-pointer" href="mailto:ksunnwy@mail.ru" target="_blank" rel="noopener noreferrer"><Mail width="32" height="32" /></a>
          </nav>
        </header>

        <h1 className="title flex flex-col absolute top-[15%] left-1/2 -translate-x-1/2 text-center uppercase">
          <span className="text-6xl">let's</span>
          <span className="text-7xl">create</span>
          <span className="text-8xl">amazing</span>
        </h1>
      </div>
    </div>
  );
}
