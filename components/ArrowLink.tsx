import Image from "next/image";
import Link from "next/link";

type Props = {
  url: string;
  title: string;
};

export default function ArrowLink({ url, title }: Props) {
  return (
    <Link
      className="flex uppercase text-[#1c6bba] mx-4 font-semibold"
      href={url}
    >
      {title}
      <Image
        src="/chevron-small.svg"
        alt="arrow-right"
        className="mx-2"
        width={12}
        height={12}
      />
    </Link>
  );
}
