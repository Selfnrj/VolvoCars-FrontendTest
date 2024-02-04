import Image from "next/image";

type Props = {
  className?: string;
  direction: "next" | "prev";
};

export default function SwiperNavigation({ direction, className }: Props) {
  return (
    <button
      className={`swiper-button-${direction} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <Image
        src="/chevron-circled.svg"
        alt="chevron-left"
        width={50}
        height={50}
        className={className}
      />
    </button>
  );
}
