"use client";

import Link from "next/link";
import { useEffect } from "react";
import localFont from "next/font/local";

const font = localFont({
  src: "./../../../public/error-font.woff2",
});

export const ErrorModal = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const playSound = () => {
    const audio = new Audio("/error.mp3"); // Укажи путь к файлу
    audio.play().catch((error) => {
      console.error("Ошибка воспроизведения звука:", error);
    });
  };

  useEffect(() => {
    document.addEventListener("click", playSound);

    return () => {
      document.removeEventListener("click", playSound);
    };
  }, []);

  return (
    <div
      className={`${font.className} w-screen h-screen [background:url("/error.jpg")_no-repeat_center_center/cover] select-none flex flex-col items-center justify-center [cursor:url("/error-cursor.png")_0_0,_auto]`}
    >
      <div className="bg-[#bfbfbf] [border:4px_ridge_#bcc1c8] flex flex-col gap-8 w-96 [box-shadow:4px_4px_0_black]">
        <div className="bg-[#0400a3] py-3 px-4 flex justify-between">
          <p className="font-bold text-white text-xl">{title}</p>
          <Link
            href="/"
            className="size-7 bg-[#bfbfbf] grid place-content-center [border:2px_outset_#fefefe] [box-shadow:2px_0_0_black,2_2_0_black] active:[box-shadow:none] active:translate-x-[2px] active:translate-y-[2px]"
          >
            <span className="text-[#8e8e8e] [text-shadow:1.3px_1px_0px_white]">
              ✖
            </span>
          </Link>
        </div>
        <div className="px-4 flex flex-col gap-8 mb-4">
          <div className="flex gap-8 items-center">
            <div className="size-12 rounded-full bg-red-700 grid place-content-center text-4xl shadow-[2px_2px_0_#848e86] text-white">
              ✖
            </div>
            <p className="text-[#313131] font-bold text-xl">{description}</p>
          </div>
          <div className="w-full flex justify-center">
            <Link
              href="/"
              className="text-lg text-[#313131] font-bold px-5 [border:2px_outset_#fefefe] [box-shadow:2px_0_0_black,2_2_0_black] active:[box-shadow:none] active:translate-x-[2px] active:translate-y-[2px]"
            >
              Ok
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
