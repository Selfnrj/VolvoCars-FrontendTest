import { cars } from "@/public/api/cars";
import Image from "next/image";
import { Button } from "vcc-ui";

export default function ShopPage({ params }: { params: { id: string } }) {
  const carsdetails = cars.find((car) => car.id === params.id);

  return (
    <div className=" max-w-screen-md mx-auto py-16">
      <h1 className="text-3xl font-bold mb-4 flex-1">
        {carsdetails?.modelName}{" "}
        <span className="text-gray-500 font-normal">
          {carsdetails?.modelType}
        </span>
      </h1>
      <Image
        src={carsdetails?.imageUrl || ""}
        alt={carsdetails?.modelName || ""}
        width={800}
        height={800}
        className="mb-4 w-full object-cover"
      />
      <Button className="max-w-[120px]">Shop</Button>
    </div>
  );
}
