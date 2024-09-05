"use client";

import Image from "next/image";
import slide1 from "@/assets/slide-1.png";
import slide2 from "@/assets/slide-2.png";
import { Carousel } from "antd";

export default function Slide() {
  return (
    <Carousel arrows autoplay>
      <div className="flex h-[320px]  items-center justify-center">
        <Image src={slide1} alt="IEDB" height={320} />
      </div>
      <div className="flex h-[320px] items-center justify-center">
        <Image src={slide2} alt="IEDB" width={660} />
      </div>
    </Carousel>
  );
}
