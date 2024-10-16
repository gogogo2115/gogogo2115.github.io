import { WebData } from "@/app/colors/web/data";

import Link from "next/link";
import { HTMLAttributes, MouseEvent } from "react";

type Props = { data: WebData } & HTMLAttributes<HTMLDivElement>;

const ColorWebPalette = ({ data, ...rest }: Props) => {
  const { name } = data;
  const nameToLowerCase = name.toLowerCase();

  const onClickCopy = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert("복사");
  };

  return (
    <div className="flex flex-col justify-between font-bold p-2 bg-white aspect-[2/1.2] gap-1 border-solid min-w-36 border-[#000] border-[2px]" {...rest}>
      <Link
        className="select-none block w-full h-full border-solid border-[#000] border-[2px] shadow p-0"
        style={{ backgroundColor: name }}
        href={`/colors/web/${nameToLowerCase}`}
        title={`${name} 상세히 보기`}
        aria-label={`${name} 상세히 보기`}
      />
      <div className="flex flex-row justify-between items-center w-full text-black px-1 py-2 gap-1 font-bold text-sm overflow-hidden">
        <b className="flex-1 truncate whitespace-nowrap text-sm sm:text-base" title={nameToLowerCase}>
          {nameToLowerCase}
        </b>
        <button type="button" className="w-7 h-7 flex items-center justify-center active:scale-90 select-none" title={`${name} 복사하기`} onClick={onClickCopy}>
          <span className="blind">{`${nameToLowerCase} 복사하기`}</span>
          <svg fill="#000000" width="100%" height="100%" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
            <g strokeWidth="0" />
            <g strokeLinecap="round" strokeLinejoin="round" />
            <g>
              <path
                d="M0 1919.887h1467.88V452.008H0v1467.88ZM1354.965 564.922v1242.051H112.914V564.922h1242.051ZM1920 0v1467.992h-338.741v-113.027h225.827V112.914H565.035V338.74H452.008V0H1920ZM338.741 1016.93h790.397V904.016H338.74v112.914Zm0 451.062h790.397v-113.027H338.74v113.027Zm0-225.588h564.57v-112.913H338.74v112.913Z"
                fillRule="evenodd"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ColorWebPalette;
