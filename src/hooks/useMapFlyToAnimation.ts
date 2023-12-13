import { useEffect, useState } from "react";
import { useMap } from "./useMap";
import { MapFeatures } from "@/types";

export function useMapFlyToAnimation(features?: MapFeatures) {
  const [activeFeature, setActiveFeature] = useState<number>();

  const { map } = useMap();

  useEffect(() => {
    if (map.current && activeFeature !== undefined && features) {
      // leaflet functions expect [lat, lng] but geojson is [lng, lat]
      const leafletCenter = features.features[activeFeature].properties.center
        .slice()
        .reverse() as [number, number];
      map.current.flyTo(leafletCenter, 16, {
        duration: 2,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, activeFeature]);

  return [activeFeature, setActiveFeature] as const;
}