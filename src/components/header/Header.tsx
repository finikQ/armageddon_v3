"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./header.module.css";

import localFont from "next/font/local";

const PassionOne = localFont({
  src: "./../../app/fonts/PassionOne_Regular.ttf",
  variable: "--Passion-One",
});

const SCROLL_THRESHOLD = 0;
const MOBILE_BREAKPOINT = 767;

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        if (scrollTop > SCROLL_THRESHOLD) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${styles.header__wrapper} ${
        isScrolled ? styles.header__wrapper_scrolled : ""
      }`}
    >
      <header className={styles.header}>
        <Link href="/" className={`${styles.title} ${PassionOne.variable}`}>
          ARMAGEDDON 2023
        </Link>
        <div className={styles.description}>
          ООО “Команда им. Б. Уиллиса”.
          <br />
          Взрываем астероиды с 1998 года.
        </div>
      </header>
    </div>
  );
};
