import { NextResponse } from "next/server";
import { getNeoFeed } from "@/services/apiNasa";
import { formatAsteroidItem } from "@/utils/formatAsteroidItem";

async function fetchProducts(date: string) {
  const asteroidWeek = await getNeoFeed(date);
  if (asteroidWeek.error) {
    return new Response(asteroidWeek.error);
  }

  const formattedAsteroids =
    asteroidWeek.near_earth_objects[`${date}`].map(formatAsteroidItem);

  return formattedAsteroids;
}

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const queryParam = searchParams.get("query");

  if (queryParam === null) {
    return new Response("Отсутствует параметр запроса 'query'", {
      status: 400,
    });
  }

  const result = await fetchProducts(queryParam);
  return NextResponse.json(result);
}
