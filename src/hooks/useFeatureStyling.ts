import { useMemo } from 'react'
import { Feature, Geometry } from 'geojson'
import getArea from '@turf/area'
import { FeatureProperties, MapFeatures } from '@/types';

export function selectFeatureStyle(feature?: Feature<Geometry, FeatureProperties & { color: string }>) {
  if (!feature) return {}

  return {
    color: feature.properties.color,
    fillOpacity: 0.5,
  };
}

/**
 * Adds a `color` property to each feature in the GeoJSON. 
 * The color is determined by the feature's area.
 */
export function useCustomFeatureStyle(geoJSON?: MapFeatures) {
  return useMemo(() => {
    if (!geoJSON) return

    const minIdx = selectMinAreaFeatureIdx(geoJSON)
    const maxIdx = selectMaxAreaFeatureIdx(geoJSON)

    const colorMap = {
      [minIdx]: "red",
      [maxIdx]: "green",
    }

    const newFeatures = geoJSON.features.map((feature, idx) => {
      return {
        ...feature,
        properties: {
          ...feature.properties,
          // default color is orange
          color: colorMap[idx] ?? "orange",
        }
      }
    })

    return {
      ...geoJSON,
      features: newFeatures,
    }
  }, [geoJSON])
}

export function selectMinAreaFeatureIdx(geoJSON: MapFeatures): number {
  let minArea = Infinity
  let minAreaFeatureIdx = -1
  geoJSON.features.forEach((feature, idx) => {
    const area = getArea(feature)
    if (area < minArea) {
      minArea = area
      minAreaFeatureIdx = idx
    }
  })

  return minAreaFeatureIdx
}

export function selectMaxAreaFeatureIdx(geoJSON: MapFeatures): number {
  let maxArea = -Infinity
  let maxAreaFeatureIdx = -1
  geoJSON.features.forEach((feature, idx) => {
    const area = getArea(feature)
    if (area > maxArea) {
      maxArea = area
      maxAreaFeatureIdx = idx
    }
  })

  return maxAreaFeatureIdx
}