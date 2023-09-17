import { AsteroidList } from "@/components/asteroidList/AsteroidList";
import { Bg_image } from "@/components/bg_image/Bg_image";
import { CartSummary } from "@/components/cart/cartSummary/CartSummary";

import { getNeoFeed } from "@/services/apiNasa";
import { formatAsteroidItem } from "@/utils/formatAsteroidItem";
import styles from "./page.module.css";

async function getAsteroids(currentDay: string) {
  const response = await getNeoFeed(currentDay);
  return response.near_earth_objects[`${currentDay}`];
}

async function getCurrentDay() {
  const response = await fetch(
    `https://timeapi.io/api/Time/current/zone?timeZone=Europe/Moscow`
  );
  const data = await response.json();
  const result = data.dateTime.split("T")[0];
  return result;
}

export default async function Home() {
  let currentDay = await getCurrentDay();
  let asteroidList = await getAsteroids(currentDay);
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div className={styles.content}>
          <AsteroidList initialList={asteroidList.map(formatAsteroidItem)} />
          <CartSummary />
        </div>
        <Bg_image />
      </div>
    </main>
  );
}
