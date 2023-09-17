"use client";

import React, { useContext, useEffect } from "react";
import styles from "./cart.module.css";
import { AppStateContext } from "@/state/AppStateProvider";
import { AsteroidListItem } from "@/components/asteroidList/asteroidListItem/AsteroidListItem";
import { Bg_image } from "@/components/bg_image/Bg_image";
import { Header } from "@/components/header/Header";
import Link from "next/link";

export const Cart = () => {
  const [itemsList, setItemsList] = React.useState<any>([]);
  const { state, setState } = useContext(AppStateContext);

  useEffect(() => {
    setItemsList(state.cartItems);

    setState((prevState: any) => ({
      ...prevState,
      cartItems: [],
    }));
  }, []);

  return (
    <div>
      <Header />

      {itemsList.length > 0 ? (
        <>
          <div className={styles.container}>
            <div className={styles.center}>
              <h1 className={styles.title}>Заказ отправлен!</h1>
              {itemsList.map((item: any) => {
                return <AsteroidListItem key={item.name} item={item} />;
              })}
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            gap: "10px",
            height: "100%",
            width: "100%",
            fontSize: "20px",
            fontWeight: 700,
            color: "#fff",
          }}
        >
          <div>¯\_(ツ)_/¯</div>
          <div>Тут пусто</div>
          <Link
            href={"/"}
            style={{ textDecoration: "underline", fontSize: "30px" }}
          >
            {"> "}Каталог{" <"}
          </Link>
        </div>
      )}
      <Bg_image />
    </div>
  );
};
