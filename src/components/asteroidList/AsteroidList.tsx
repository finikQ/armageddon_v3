"use client";

import React, { useState, useEffect, useRef } from "react";
import { AsteroidListItem } from "./asteroidListItem/AsteroidListItem";
import { Asteroid } from "@/types/types";
import styles from "./asteroidlist.module.css";

interface AsteroidListProps {
  initialList: Asteroid[];
}

async function getAsteroids(currentDate: string) {
  const serverUrl = process.env.SERVER_URL || "";
  const response = await fetch(`${serverUrl}/api/scroll?query=${currentDate}`);
  let data = await response.json();
  return data;
}

export function AsteroidList({ initialList }: AsteroidListProps) {
  const [asteroidList, setAsteroidList] = useState<Asteroid[]>(initialList);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>("");

  const currentDareRef = useRef(currentDate);
  const isLoadingRef = useRef(isLoading);

  const loadMore = async () => {
    setIsLoading(true);
    isLoadingRef.current = true;

    try {
      const productList = await getAsteroids(currentDareRef.current);
      setAsteroidList((prevList) => [...prevList, ...productList]);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    } finally {
      const nextDate = new Date(currentDareRef.current);
      nextDate.setDate(nextDate.getDate() + 1);
      currentDareRef.current = nextDate.toISOString().split("T")[0];
      setCurrentDate(nextDate.toISOString().split("T")[0]);
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  };

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (
      scrollTop + clientHeight + 300 >= scrollHeight &&
      !isLoadingRef.current
    ) {
      loadMore();
    }
  };

  useEffect(() => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    currentDareRef.current = nextDate.toISOString().split("T")[0];
    setCurrentDate(nextDate.toISOString().split("T")[0]);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [isDistanceKm, setIsDistanceKm] = useState(true);

  const handleDistanceKmOn = () => {
    setIsDistanceKm(true);
  };

  const handleDistanceKmOff = () => {
    setIsDistanceKm(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Ближайшие подлёты астероидов</div>
          <div className={styles.span}>
            <span
              className={isDistanceKm ? styles.span_on : styles.span_off}
              onClick={handleDistanceKmOn}
            >
              в километрах
            </span>
            {" | "}
            <span
              className={isDistanceKm ? styles.span_off : styles.span_on}
              onClick={handleDistanceKmOff}
            >
              в лунных орбитах
            </span>
          </div>
        </div>
        {asteroidList.map((item: Asteroid) => {
          return (
            <AsteroidListItem
              key={item.name}
              item={item}
              isDistanceKm={isDistanceKm}
              type={"catalog"}
            />
          );
        })}
        {isLoading && <div className={styles.fetching}></div>}
      </div>
    </>
  );
}
