import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import getCenter from "@turf/centroid";
import getArea from "@turf/area";
import { Feature, Polygon } from 'geojson'
import { FeatureProperties, MapFeatures } from '@/types';

const FEATURES_ENDPOINT = "https://staging-mortar-tech-test-2im2.encr.app/coordinates"

type Coordinate = {
  latitude: number,
  longitude: number,
}

interface Data {
  Coords: {
    [region: string]: Coordinate[]
  }
}

export function useMapFeatures() {
  const { data, error, isPending, isPaused } = useQuery<Data, unknown, MapFeatures>({
    queryKey: ['mapFeatures'],
    queryFn: () =>
      axios
        .post(FEATURES_ENDPOINT)
        .then((res) => res.data),
    // data transformation - doesn't affect query cache
    select: convertDataToGeoJSON,
    retry: 4,
    retryDelay: (count) => count * 1000, // linear backoff of 1s between retries
    refetchOnReconnect: true,
    staleTime: Infinity,
  })

  // If cache is empty and the query is paused, the network or server could be offline.
  const isOffline = isPending && isPaused

  return { data, error, isPending, isOffline }
}

export function convertDataToGeoJSON(data: Data) {
  const geoJSON: MapFeatures = {
    type: "FeatureCollection",
    features: []
  }

  for (const [region, coordinates] of Object.entries(data.Coords)) {
    const polygon = coordinates.map(coord => [coord.longitude, coord.latitude])

    const feature: Feature<Polygon, FeatureProperties> = {
      type: "Feature",
      properties: {
        region,
        // default values for center and area
        center: [0, 0],
        area: 0,
      },
      geometry: {
        type: "Polygon",
        coordinates: [polygon],
      }
    }
    feature.properties.center = getCenter(feature).geometry.coordinates as [number, number]
    feature.properties.area = getArea(feature)

    geoJSON.features.push(feature)
  }

  return geoJSON
}

