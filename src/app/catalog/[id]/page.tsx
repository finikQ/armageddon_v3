import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import styles from "./page.module.css";

type Props = {
  params: {
    id: number;
  };
};

type close_approach_data = {
  close_approach_date: string;
  epoch_date_close_approach: number;
  miss_distance: { kilometers: string };
};

const apiKey = process.env.API_KEY;

async function getProduct(id: number) {
  const response = await fetch(
    `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`
  );
  return response.json();
}

export default async function Asteroid({ params: { id } }: Props) {
  try {
    const asteroid = await getProduct(id);

    const currentDate = new Date();
    const yearsLater = new Date();
    yearsLater.setFullYear(currentDate.getFullYear() + 20);
    const futureDates = asteroid.close_approach_data.filter(
      (data: close_approach_data) => {
        const epochDate = new Date(data.epoch_date_close_approach);
        return epochDate > currentDate && epochDate <= yearsLater;
      }
    );

    return (
      <>
        <div className={styles.container}>
          <div className={styles.center}>
            <h1 className={styles.title}>{asteroid.name}</h1>
            <div className={styles.description}>
              Диаметр: Ø{" "}
              {Math.round(
                asteroid.estimated_diameter.meters.estimated_diameter_min
              )}{" "}
              м - Ø{" "}
              {Math.round(
                asteroid.estimated_diameter.meters.estimated_diameter_max
              )}{" "}
              м
            </div>
            <div className={styles.description}>
              Абсолютная звездная величина: {asteroid.absolute_magnitude_h}
            </div>
            <div>
              {asteroid.is_potentially_hazardous_asteroid ? (
                <div className={styles.danger}>ОПАСНО</div>
              ) : (
                ""
              )}
            </div>

            <div className={styles.close_approach}>
              <div className={styles.title}>Сближения с Землей</div>
              {futureDates.map((item: any) => {
                return (
                  <div key={item.epoch_date_close_approach}>
                    <div className={styles.description}>
                      Дата: {formatDate(item.close_approach_date)}
                    </div>
                    <div className={styles.description}>
                      Расстояние:{" "}
                      {Math.floor(item.miss_distance.kilometers).toLocaleString(
                        "ru-RU"
                      )}{" "}
                      км
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
    return (
      <div>
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
          <div>Что-то пошло не так при загрузке астероида</div>
          <Link
            href={"/"}
            style={{ textDecoration: "underline", fontSize: "30px" }}
          >
            {"> "}Каталог{" <"}
          </Link>
        </div>
      </div>
    );
  }
}
