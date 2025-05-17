import { find } from "lodash";
import locations from "./locations.json";

export function getAllCountries() {
  return locations.map((i) => i.county_name);
}

export function getSubCounties(county) {
  return (find(locations, { county_name: county })?.constituencies || []).map(
    (i) => i.constituency_name
  );
}

export function getAreas(county, constituency) {
  const constituencies =
    find(locations, {
      county_name: county,
    })?.constituencies || [];

  return find(constituencies, { constituency_name: constituency })?.wards || [];
}
