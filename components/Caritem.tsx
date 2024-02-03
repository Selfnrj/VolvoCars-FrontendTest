import Image from "next/image";
import ArrowLink from "./ArrowLink";

type Props = {
  car: {
    id: string;
    modelName: string;
    bodyType: string;
    modelType: string;
    imageUrl: string;
  };
};

export default function CarItem({ car }: Props) {
  return (
    <div
      className="snap-center shrink-0 sm:w-[33.3%] w-full"
      key={car.modelName}
    >
      <small className="uppercase text-gray-500 text-sm font-semibold">
        {car.bodyType}
      </small>
      <h1 className="text-xl font-bold mb-4">
        {car.modelName}{" "}
        <span className="text-gray-400 font-normal">{car.modelType}</span>
      </h1>
      <div className="relative h-60">
        <Image
          src={car.imageUrl}
          alt={car.modelName}
          fill
          className="mb-4 object-cover"
        />
      </div>
      <div className="flex justify-center mt-8">
        <ArrowLink title="Learn" url={`/learn/${car.id}`} />
        <ArrowLink title="Shop" url={`/shop/${car.id}`} />
      </div>
    </div>
  );
}
