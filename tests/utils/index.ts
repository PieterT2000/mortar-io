import { MapFeatures } from "@/types"
import { Polygon } from "geojson"
import getCenter from "@turf/centroid"

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
  })
  return geoJSON
}

export function coordsFromGeoJSON(geoJSON: MapFeatures) {
  return geoJSON.features.map((feature) => (feature.geometry as Polygon).coordinates[0])
}