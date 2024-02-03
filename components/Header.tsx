"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SelectInput } from "vcc-ui";

type Props = {
  cars: {
    bodyType: string;
  }[];
  setFilteredCars: (cars: any) => void;
};

function Header({ cars, setFilteredCars }: Props) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
    router.push(`?type=${e.target.value}`);
    setFilteredCars(
      cars.filter((car) => car.bodyType.includes(e.target.value))
    );
  };

  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-6xl font-bold mb-8">Volvo Cars</h1>
      <div className="w-[200px]">
        <SelectInput label={"Biltyp"} value={value} onChange={handleChange}>
          <option value="suv">Suv</option>
          <option value="estate">Estate</option>
          <option value="sedan">Sedan</option>
        </SelectInput>
      </div>
    </header>
  );
}

export default Header;
