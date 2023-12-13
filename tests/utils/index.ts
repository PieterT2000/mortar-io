import { MapFeatures } from "@/types"
import { Polygon } from "geojson"
import getCenter from "@turf/centroid"
import getArea from "@turf/area"

/* ----------------- */
/* Utility functions to write shorter tests */
/* ----------------- */

export function geoJsonFromCoords(coords: [number, number][][]): MapFeatures {
  const geoJSON: MapFeatures = {
    type: "FeatureCollection",
    features: coords.map((coord, i) => {
      return {
        type: "Feature",
        properties: {
          region: `region${i + 1}`,
          center: [0, 0],
          area: 0,
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            coord
          ],
        }
      }
    })
  }
  geoJSON.features.forEach(feature => {
    feature.properties.center = getCenter(feature).geometry.coordinates as [number, number]
    feature.properties.area = getArea(feature)
  })
  return geoJSON
}

export function coordsFromGeoJSON(geoJSON: MapFeatures) {
  return geoJSON.features.map((feature) => (feature.geometry as Polygon).coordinates[0])
}