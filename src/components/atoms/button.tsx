import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";

type Button = {
  text?: string;
  rounded?: boolean;
  onClick: string;
  target?: boolean;
};

type ButtonIcon = {
  text?: string;
  rounded?: boolean;
  size?: number;
  onClick: string;
  target?: boolean;
};

const sameClass =
  "transition duration-200 border-solid border-2 text-sm font-bold leading-tight text-center inline-flex flex-col items-start justify-start";

export const ButtonPrimary = ({ text, rounded, onClick, target }: Button) => (
  <Link
    href={onClick}
    target={target ? "_blank" : ""}
    className={`bg-blue-400 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition`}
  >
    {text}
  </Link>
);

export const ButtonSecondary = ({ text, rounded, onClick, target }: Button) => (
  <Link
    href={onClick}
    target={target ? "_blank" : ""}
    className={`${sameClass} rounded border-blue-400 bg-blue-400 px-4 py-3 text-white ${
      rounded ? "rounded-full" : "rounded-2xl"
    } hover:bg-blue-300 hover:text-blue-400`}
  >
    {text}
  </Link>
);

export const ButtonWhiteRed = ({ text, rounded, onClick, target }: Button) => (
  <Link
    href={onClick}
    target={target ? "_blank" : ""}
    className={`${sameClass} rounded border-white bg-white px-10 py-3 text-red-400 ${
      rounded ? "rounded-full" : "rounded-2xl"
    } hover:bg-red-400 hover:text-white`}
  >
    {text}
  </Link>
);

export const ButtonView = ({ text, rounded, onClick }: Button) => (
  <Link
    href={onClick}
    className={`${sameClass} rounded-full border-white bg-transparent p-3 text-blue-600 hover:bg-blue-600 hover:text-white md:p-3 lg:p-5`}
  >
    <Image
      unoptimized
      src="/assets/icons/eye.svg"
      width={30}
      height={30}
      alt="template-check-icon"
    />
  </Link>
);

// export const ButtonCart = ({ text, rounded, onClick }: Button) => (
//   <Link href={onClick} className={`${sameClass} border-white text-blue-600 lg:p-5 bg-transparent rounded-full hover:bg-blue-600 hover:text-white md:p-3 p-3`}>
//     <Image unoptimized  src="/assets/icons/cart.svg" width={30} height={30} alt="template-check-icon" />
//   </Link>
// );

export const ButtonSearch = ({ text, rounded, onClick, size }: ButtonIcon) => (
  <Link href={onClick}>
    <Image
      unoptimized
      src="/icons/search.svg"
      width={size}
      height={size}
      alt="search-icon"
    />
  </Link>
);

export const ButtonFilter = ({ text, rounded, onClick, size }: ButtonIcon) => (
  <Link href={onClick}>
    <Image
      unoptimized
      src="/icons/filter.svg"
      width={size}
      height={size}
      alt="filter-icon"
    />
  </Link>
);

export const ButtonProfile = ({ text, rounded, onClick }: Button) => (
  <Link href={onClick}>
    <Image
      unoptimized
      src="/icons/profile.svg"
      width={30}
      height={30}
      alt="profile-icon"
    />
  </Link>
);

export const ButtonCart = ({ text, rounded, onClick }: Button) => (
  <Link href={onClick} className="hidden md:block">
    <div className="relative flex">
      <Image
        unoptimized
        src="/icons/cart.svg"
        width={25}
        height={25}
        alt="cart-icon"
      />
      <div>
        <span className="absolute bottom-3 left-3 rounded-full bg-blue-100 bg-primary-400 px-[6.5px] py-[2px] text-sm text-xs font-bold text-white">
          {text}
        </span>
      </div>
    </div>
  </Link>
);

export const ButtonOutline = ({ text, rounded, onClick }: Button) => (
  <Link
    href={onClick}
    className={`mx-2 mb-2 inline-flex flex-col items-start justify-start rounded-full border border-solid bg-transparent px-6 py-2 text-center text-sm font-bold capitalize leading-tight  transition duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white ${
      rounded
        ? "border-blue-600 text-blue-600"
        : "border-gray-500 text-gray-500"
    }`}
  >
    {text}
  </Link>
);

export const ButtonContact = ({
  text,
  onClick,
}: {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  <button
    type="submit"
    onClick={onClick}
    className={`${sameClass} rounded-2xl border-blue-600 bg-blue-600 px-4 py-3 text-white hover:bg-transparent hover:text-blue-600`}
  >
    {text}
  </button>
);
