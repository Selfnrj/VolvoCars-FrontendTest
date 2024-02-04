"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cars } from "@/public/api/cars";
import { useRouter, useSearchParams } from "next/navigation";
import { SelectInput } from "vcc-ui";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

import "swiper/css";
import CarItem from "./CarItem";

export default function ImageSlider() {
  const searchParams = useSearchParams();
  const selectedType = searchParams.get("type");
  const [filteredCars, setFilteredCars] = useState(cars);
  const router = useRouter();
  const [value, setValue] = useState<any>(selectedType || "");

  const handleChange = (e: any) => {
    setValue(e.target.value);
    router.push(`?type=${e.target.value}`);
    setFilteredCars(
      cars.filter((car) => car.bodyType.includes(e.target.value))
    );
  };

  useEffect(() => {
    if (selectedType) {
      setFilteredCars(cars.filter((car) => car.bodyType === selectedType));
    } else {
      setFilteredCars(cars);
    }
  }, [selectedType]);

  const handleClick = () => {
    setValue("");
    router.push("/");
    setFilteredCars(cars);
  };

  return (
    <>
      <div className="flex items-center mb-8">
        <div className="w-[200px] mr-4">
          <SelectInput
            className="w-full"
            label={"Body type"}
            value={value}
            onChange={handleChange}
          >
            <option value="suv">Suv</option>
            <option value="estate">Estate</option>
            <option value="sedan">Sedan</option>
          </SelectInput>
        </div>
        {selectedType && (
          <button onClick={handleClick} className="text-blue-500 font-bold">
            Clear
          </button>
        )}
      </div>
      <Swiper
        spaceBetween={30}
        breakpoints={{
          640: {
            slidesPerView: 1.5,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
      >
        {filteredCars.map((car) => (
          <SwiperSlide key={car.id}>
            <CarItem car={car} />
          </SwiperSlide>
        ))}
        <div className="flex-row justify-end mt-8 hidden sm:flex">
          <button className="swiper-button-prev disabled:opacity-50 disabled:cursor-not-allowed">
            <Image
              src="/chevron-circled.svg"
              alt="chevron-left"
              width={50}
              height={50}
              className="transform rotate-180 mr-4"
            />
          </button>
          <button className="swiper-button-next disabled:opacity-50 disabled:cursor-not-allowed">
            <Image
              src="/chevron-circled.svg"
              alt="chevron-left"
              width={50}
              height={50}
            />
          </button>
        </div>
        <div className="swiper-pagination sm:hidden" />
      </Swiper>
    </>
  );
}
