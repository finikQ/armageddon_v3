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
  const date = new Date();
  date.setHours(date.getHours() + 3);
  const result = date.toISOString().split("T")[0];
  return result;
}

export const revalidate = 1800;

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
