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
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: false });

export default function Main() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const containerRef = useRef(null);

  useEffect(() => {
    window?.scrollTo(0, 0);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 0%",
        end: "bottom 0%",
        scrub: 1,
        pin: true,
        pinSpacing: false,
      },
    });

    tl
      .add("first")
      .to(".title", { autoAlpha: 0, duration: 10 }, "first")

      .add("second")
      .to(".techs", { autoAlpha: 1, visibility: "visible", duration: 10 }, "second")

      .add("end")
      .to(".title", { autoAlpha: 0, duration: 30 }, "end");

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
      <div ref={containerRef} className={`animation_block w-[100dvw] relative h-[200vh] select-none translate-y-0`}>
        <header className="flex items-center justify-between py-8 px-12">
          <Link href={"/"}><Image src={"/favicon.png"} alt="logo" width={38} height={38} /></Link>
          <nav className="flex items-center gap-6">
            <a className="cursor-pointer" href="https://github.com/ksunwy" target="_blank" rel="noopener noreferrer"><Github width="32" height="32" /></a>
            <a className="cursor-pointer" href="https://t.me/ksunnw" target="_blank" rel="noopener noreferrer"><Telegram width="32" height="32" /></a>
            <a className="cursor-pointer" href="mailto:ksunnwy@mail.ru" target="_blank" rel="noopener noreferrer"><Mail width="32" height="32" /></a>
          </nav>
        </header>

        <div className="title flex flex-col gap-6 items-center justify-center">
          <h1 className="flex flex-col absolute top-[15%] left-1/2 -translate-x-1/2 text-center uppercase">
            <span className="text-6xl">let's</span>
            <span className="text-7xl">create</span>
            <span className="text-8xl">amazing</span>
          </h1>
          <p className="font-poppins">ksunnwy - your best frontend developer</p>
        </div>

        <section className="techs absolute top-[12%] left-1/2 -translate-x-1/2 flex flex-col gap-10 font-poppins w-full invisible opacity-0 max-w-[1130px]">
          <h2 className="font-bold text-4xl">I USE</h2>
          <div className="flex flex-wrap items-center gap-3">
            <a className="link" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer"><Image src={"/logo/js.svg"} alt="js" width={176} height={151} /></a>
            <div className="w-[176px] h-[151px]"></div>
            <a className="link" href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"><Image src={"/logo/ts.svg"} alt="ts" width={176} height={151} /></a>
            <a className="link" href="https://react.dev/" target="_blank" rel="noopener noreferrer"><Image src={"/logo/react.svg"} alt="react" width={176} height={151} /></a>
            <a className="link" href="https://nextjs.org/" target="_blank" rel="noopener noreferrer"><Image src={"/logo/next.svg"} alt="next" width={176} height={151} /></a>
            <a className="link" href="https://framermotion.framer.website/" target="_blank" rel="noopener noreferrer"><Image src={"/logo/framer.svg"} alt="framer" width={176} height={151} /></a>
            <br />
            <a className="link" href="https://gsap.com/" target="_blank" rel="noopener noreferrer"><Image src={"/logo/gsap.svg"} alt="gsap" width={176} height={151} /></a>
            <a className="link" href="https://redux.js.org/" target="_blank" rel="noopener noreferrer"><Image src={"/logo/redux.svg"} alt="redux" width={176} height={151} /></a>
            <div className="w-[176px] h-[151px]"></div>
            <a className="link" href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer"><Image src={"/logo/tailwind.svg"} alt="tailwind" width={176} height={151} /></a>
            <div className="w-[176px] h-[151px]"></div>
            <a className="link" href="https://threejs.org/docs/" target="_blank" rel="noopener noreferrer"><Image src={"/logo/three.svg"} alt="three" width={176} height={151} /></a>
          </div>
        </section>
      </div>
    </div>
  );
}
