import { FeatureCollection, Geometry } from "geojson";

export type FeatureProperties = { center?: [number, number]; region: string }
export type MapFeatures<T = FeatureProperties> = FeatureCollection<Geometry, FeatureProperties & T>
export type MapFeaturesWithStyle = MapFeatures<{ color: string }>