export interface Asteroid {
  id: string;
  name: string;
  close_approach_date: string;
  miss_distance: { kilometers: string; lunar: string };
  estimated_diameter_min: number;
  estimated_diameter_max: number;
}
