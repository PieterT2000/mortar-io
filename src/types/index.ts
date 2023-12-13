import { FeatureCollection, Geometry } from "geojson";

export type FeatureProperties = { center: [number, number]; region: string; area: number; }
export type MapFeatures<T = FeatureProperties> = FeatureCollection<Geometry, FeatureProperties & T>
export type MapFeaturesWithStyle = MapFeatures<{ color: string }>