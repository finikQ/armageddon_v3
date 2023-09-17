function formatAsteroidItem(asteroid: any) {
  return {
    id: asteroid.id,
    name: asteroid.name,
    close_approach_date: asteroid.close_approach_data[0].close_approach_date,
    miss_distance: {
      kilometers: asteroid.close_approach_data[0].miss_distance.kilometers,
      lunar: asteroid.close_approach_data[0].miss_distance.lunar,
    },
    estimated_diameter_min: Math.round(
      asteroid.estimated_diameter.meters.estimated_diameter_min
    ),
    estimated_diameter_max: Math.round(
      asteroid.estimated_diameter.meters.estimated_diameter_max
    ),
  };
}

export { formatAsteroidItem };
