import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "https://images.unsplash.com/photo-1697301439922-4e686fbb302f",
    title: "Neo Elegance",
    code: "ES 9887 089G",
  },
  {
    src: "https://images.unsplash.com/photo-1644352739408-a191ed85e513",
    title: "Aurora Nightfall",
    code: "XR 1290 32B",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1677187301430-f72321664a74",
    title: "Golden Mirage",
    code: "LK 4321 11D",
  },
  {
    src: "https://images.unsplash.com/photo-1630415011060-f0dbd3aab29a",
    title: "Velvet Horizon",
    code: "VP 3420 77K",
  },
  {
    src: "https://images.unsplash.com/photo-1618468121353-aaa41d8fb2e0",
    title: "Opal Bloom",
    code: "SD 8821 45M",
  },
  {
    src: "https://images.unsplash.com/photo-1530103540420-3f5fce164e66",
    title: "Starlit Echo",
    code: "GF 6783 02X",
  },
  {
    src: "https://images.unsplash.com/photo-1696862048447-3ab8435ce5f1",
    title: "Silken Dawn",
    code: "MT 9078 66L",
  },
  {
    src: "https://images.unsplash.com/photo-1604585571671-f16dde09bb44",
    title: "Mystic Grove",
    code: "HT 1110 29R",
  },
  {
    src: "https://images.unsplash.com/photo-1587933780767-33c36434f623",
    title: "Crimson Dust",
    code: "PL 3302 08W",
  },
  {
    src: "https://images.unsplash.com/photo-1611755217171-67c8e51055ac",
    title: "Eclipse Tide",
    code: "WX 7543 94N",
  },
];

const getZ = (index) => -22500 + index * 2500;

const App = () => {
  const slidesRef = useRef([]);
  const blurImgsRef = useRef([]);
  const container = useRef(null);

  useEffect(() => {
    slidesRef.current.forEach((slide, index) => {
      const initialZ = getZ(index);

      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",

        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          console.log("Progress:", progress);
          const z = initialZ + progress * 22500;
          console.log("Z:", z);

          let opacity =
            z > -2500
              ? ((z + 2500) / 2500) * 0.5 + 0.5
              : ((z + 5000) / 2500) * 0.5;
          slide.style.opacity = Math.max(0, Math.min(1, opacity));
          slide.style.transform = `translateX(-50%) translateY(-40%) translateZ(${z}px)`;

          gsap.to(blurImgsRef.current[index], {
            opacity: z < 100 ? 1 : 0,
            duration: 1.5,
            ease: "power3.out",
          });
        },
      });
    });
  }, []);

  return (
    <div
      ref={container}
      className="w-full h-[2000vh]   relative overflow-hidden"
    >
      <div className="fixed top-0   left-0 w-full h-full z-[-1]">
        {images.map((item, i) => (
          <div
            key={i}
            className="absolute w-full h-full opacity-0"
            ref={(el) => (blurImgsRef.current[i] = el)}
          >
            <img
              src={`${item.src}?w=600&auto=format&fit=crop&q=60`}
              alt="bg"
              className="w-full h-full object-cover blur-md scale-[1.125]"
            />
            <div
              className={`absolute  px-10 bottom-6 w-full
      ${i % 2 === 0 ? " text-center sm:text-start" : "text-center sm:text-end"} 
        `}
            >
              <p className="text-[#ff8800] font-extrabold text-[5vw]  leading-none tracking-wide uppercase">
                {item.title}
              </p>{" "}
              <p className="text-[2vw] font-extrabold text-[#ff8800]">
                ({item.code})
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed  top-0 w-full h-screen perspective-[750px] overflow-hidden">
        {images.map((item, i) => (
          <div
            key={i}
            ref={(el) => (slidesRef.current[i] = el)}
            className={`absolute sm:w-[450px] w-[350px]
h-[250px] sm:h-[350px] top-[70%] opacity-0 transform -translate-y-1/2 ${
              i % 2 === 0
                ? "sm:left-[90%] left-[95%]"
                : "left-[95%] sm:left-[55%]"
            } -translate-x-1/2`}
            style={{
              transform: `translateX(-50%) translateY(-50%) translateZ(${getZ(
                i
              )}px)`,
            }}
          >
            <img
              src={`${item.src}?w=600&auto=format&fit=crop&q=60`}
              alt="slide"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
