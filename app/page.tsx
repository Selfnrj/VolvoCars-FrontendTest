"use client";

import { useEffect, useState } from "react";
import { cars } from "@/public/api/cars";
import { useRouter, useSearchParams } from "next/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Filter from "@/components/Filter";
import SwiperItem from "@/components/SwiperItem";
import SwiperNavigation from "@/components/SwiperNavigation";

export default function Home() {
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
    <div className="ml-4 sm:mx-4">
      <Filter
        value={value}
        handleChange={handleChange}
        handleClick={handleClick}
        selectedType={selectedType}
      />
      <Swiper
        slidesPerView={1.2}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
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
            <SwiperItem car={car} />
          </SwiperSlide>
        ))}
        <div className="flex-row justify-end mt-8 hidden sm:flex">
          <SwiperNavigation
            className="transform rotate-180 mr-4"
            direction="prev"
          />
          <SwiperNavigation direction="next" />
        </div>
        <div className="swiper-pagination sm:hidden" />
      </Swiper>
    </div>
  );
}
