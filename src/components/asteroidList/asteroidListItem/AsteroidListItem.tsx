"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppStateContext } from "@/state/AppStateProvider";

import { SvgArrow } from "@/components/other/SvgArrow";
import { formatDate } from "@/utils/formatDate";
import { formatLunarDisctance } from "@/utils/formatWords";

import imgBig from "@/../public/pngegg_2.png";
import imgSmall from "@/../public/pngegg_1.png";
import styles from "./asteroidlistitem.module.css";

export const AsteroidListItem = ({ item, isDistanceKm, type }: any) => {
  const { state, setState } = useContext(AppStateContext);

  const [arrowWidth, setArrowWidth] = useState<number>(0);

  let distance = "";
  if (isDistanceKm) {
    distance = `${Math.round(item.miss_distance.kilometers).toLocaleString(
      "ru-RU"
    )} км`;
  } else {
    let lunarDistance = Math.round(item.miss_distance.lunar);
    let lunarDisctanceLabel = formatLunarDisctance(lunarDistance);
    distance = `${lunarDisctanceLabel}`;
  }

  const dist_km = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (dist_km.current) {
      setArrowWidth(dist_km.current.offsetWidth);
    }
  }, [isDistanceKm]);

  let date = formatDate(item.close_approach_date);

  const isBig =
    Math.round(item.estimated_diameter_min + item.estimated_diameter_max) > 150;

  const isOrdered = state && state.cartItems && state.cartItems.includes(item);

  const handleAddItem = () => {
    if (!isOrdered) {
      setState((prevState: any) => ({
        ...prevState,
        cartItems: [...prevState.cartItems, item],
      }));
    } else {
      setState((prevState: any) => ({
        ...prevState,
        cartItems: prevState.cartItems.filter(
          (cartItem: any) => cartItem.id !== item.id
        ),
      }));
    }
  };

  return (
    <div className={styles.item}>
      <h2 className={styles.date}>{date}</h2>
      <div className={styles.body}>
        <div className={styles.info__dist}>
          <div className={styles.info__dist__km} ref={dist_km}>
            {distance}
          </div>
          <SvgArrow width={arrowWidth} />
        </div>
        <div className={styles.info__img__container}>
          {
            <Image
              src={isBig ? imgBig : imgSmall}
              alt="Астероид"
              className={styles.info__img}
              width={isBig ? 37 : 23}
              height={isBig ? 40 : 24}
            />
          }
        </div>
        <div className={styles.info__asteroid}>
          <Link
            href={`/catalog/${item.id}`}
            className={styles.info__asteroid__name}
          >
            {item.name}
          </Link>
          <div className={styles.info__asteroid__diameter}>
            {"Ø "}
            {item.estimated_diameter_max}
            {" м"}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        {type == "catalog" ? (
          <button className={styles.btn_toCart}>
            <span className={styles.btn_toCart_text} onClick={handleAddItem}>
              {isOrdered ? "В КОРЗИНЕ" : "ЗАКАЗАТЬ"}
            </span>
          </button>
        ) : (
          ""
        )}

        {item.is_potentially_hazardous_asteroid && (
          <div className={styles.desc_danger}>⚠ Опасен</div>
        )}
      </div>
    </div>
  );
};
