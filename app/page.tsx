"use client";

import CarItem from "@/components/Caritem";
import Header from "@/components/Header";
import { cars } from "@/public/api/cars";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const carousel = useRef<HTMLDivElement>(null);
  const maxScrollWidth = useRef(0);
  const searchParams = useSearchParams();
  const selectedType = searchParams.get("type");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredCars, setFilteredCars] = useState(cars);

  console.log("carousel", carousel);

  const movePrev = () => {
    setCurrentIndex((prevState) => prevState - 1);
  };

  const moveNext = () => {
    setCurrentIndex((prevState) => prevState + 1);
  };

  const isDisabled = (direction: any) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  useEffect(() => {
    if (selectedType) {
      setFilteredCars(cars.filter((car) => car.bodyType === selectedType));
    } else {
      setFilteredCars(cars);
    }
  }, [selectedType]);

  const dots = Array.from({ length: filteredCars.length }, (_, i) => i);

  return (
    <>
      <Header cars={cars} setFilteredCars={setFilteredCars} />
      <div
        className="flex touch-pan-x snap-x snap-mandatory gap-3 overflow-hidden scroll-smooth scrollbar"
        ref={carousel}
      >
        {filteredCars.map((car) => (
          <CarItem key={car.id} car={car} />
        ))}
      </div>
      <div className="flex justify-center mt-16 sm:hidden">
        {dots.map((index) => (
          <div
            key={index}
            className={`${
              currentIndex === index ? "bg-[#17375E]" : "bg-[#D3D3D3]"
            } w-3 h-3 rounded-full mx-1`}
          ></div>
        ))}
      </div>

      <div className="flex-row justify-end mt-8 hidden sm:flex">
        <button
          className={`${
            isDisabled("prev") && "cursor-not-allowed opacity-50"
          } flex font-bold text-[#17375E]`}
          onClick={movePrev}
          disabled={isDisabled("prev")}
        >
          <Image
            src="/chevron-circled.svg"
            alt="chevron-left"
            width={50}
            height={50}
            className="transform rotate-180 mr-4"
          />
        </button>
        <button
          className={`${
            isDisabled("next") && "cursor-not-allowed opacity-50"
          } flex font-bold text-[#17375E]`}
          disabled={isDisabled("next")}
          onClick={moveNext}
        >
          <Image
            src="/chevron-circled.svg"
            alt="chevron-left"
            width={50}
            height={50}
          />
        </button>
      </div>
    </>
  );
}
