"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./cartsummary.module.css";
import { AppStateContext } from "@/state/AppStateProvider";
import { formatAsteroidCount } from "@/utils/formatWords";
import Link from "next/link";

export const CartSummary = () => {
  const { state, setState } = useContext(AppStateContext);
  const [isSmallTop, setIsSmallTop] = useState(false);
  console.log(state);

  let lunarDisctanceLabel =
    state && state.cartItems ? formatAsteroidCount(state.cartItems.length) : "";

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 767) {
        if (window.scrollY > 78) {
          setIsSmallTop(true);
        } else {
          setIsSmallTop(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.container} ${
          isSmallTop ? styles.container_small : ""
        }`}
      >
        <div className={styles.header}>
          <div className={styles.title}>Корзина</div>
          <div className={styles.count}>{lunarDisctanceLabel}</div>
        </div>

        <Link href="/cart/summary">
          <button className={styles.button__send_order}>
            <span className={styles.button__send_order__text}>Отправить</span>
          </button>
        </Link>
      </div>
    </div>
  );
};
