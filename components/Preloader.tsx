"use client";
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const strings: string[] = ["generating cubes...", "getting new ones...", "where to where for what to where to where..."];

const Preloader = ({ isLoaded }: { isLoaded: boolean }) => {
    const preloaderTimeline = gsap.timeline({});
    const textRef = useRef<HTMLSpanElement>(null);
    const percentRef = useRef(0);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const percentDisplayRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!gsap || !textRef.current) return;

        if (!tlRef.current) {
            tlRef.current = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        } else {
            tlRef.current.clear();
        }

        const tl = tlRef.current;

        tl.addLabel("start");

        tl.to(textRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                const nextIndex = (strings.indexOf(textRef.current?.innerText || "") + 1) % strings.length;
                textRef.current!.innerText = strings[nextIndex];
            }
        }, "start")
        .to(textRef.current, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, "+=0.2");

        return () => {
            if (tlRef.current) {
                tlRef.current.kill();
                tlRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const updatePercent = () => {
            if (percentRef.current < 99) {
                percentRef.current = Math.min(99, percentRef.current + 1);
                gsap.to(percentDisplayRef.current, {
                    duration: 0.1,
                    textContent: `${percentRef.current}%`,
                    roundProps: "textContent",
                    ease: "power2.inOut"
                });
            } else if (document.readyState === 'complete' && isLoaded) {
                preloaderTimeline
                    .to(".preloader", { duration: 1.5, opacity: 0, ease: 'power2.inOut', delay: 1.5 }, 0)
                    .to(".preloader", { zIndex: 0, delay: 1.5 }, 0)
                    .to('html', { duration: 0, overflowY: 'visible', delay: 1.9 }, 0);
            }
        };

        const ticker = gsap.ticker.add(updatePercent);

        return () => {
            gsap.ticker.remove(ticker);
        };
    }, [isLoaded]);

    return (
        <div className='preloader flex flex-col gap-3 items-center justify-center fixed top-0 left-0 h-[100dvh] w-[100dvw] bg-[#A0B4F5] z-[999999999]'>
            <video
                src="/loading.mp4"
                width={1200}
                height={900}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            ></video>
            <div className="flex flex-col gap-3 items-center justify-center absolute left-1/2 -translate-x-1/2 bottom-12">
                <span ref={percentDisplayRef} className='text-[#171717] text-3xl'>{percentRef.current}%</span>
                <span ref={textRef} className="text-[#171717] text-xl font-poppins text-center">{strings[0]}</span>
            </div>
        </div>
    );
};

export default Preloader;
