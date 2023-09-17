import React from "react";
import Image from "next/image";
import styles from "./bg_image.module.css";

export const Bg_image = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Image
          src="/planeta_zemlia_kosmos_167499_2560x1600.jpg"
          alt="Планета Земля"
          className={styles.image}
          fill={true}
          priority
          sizes="(min-width: 1356px) 536px,
          (max-width: 1355px) 377px,
          800px"
        />
      </div>
    </div>
  );
};
