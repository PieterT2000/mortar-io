import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { FeatureCollection } from "geojson";
import { selectFeatureStyle } from "@/hooks/useFeatureStyling";
import "@/styles/Map.css";
import { useMap } from "@/hooks/useMap";

type MapProps = {
  className?: string;
  features?: FeatureCollection;
  children?: React.ReactNode;
};

const Map = (props: MapProps) => {
  const { setMap } = useMap();
  const { className, features } = props;

  return (
    <div className={className}>
      <MapContainer
        center={[48.856613, 2.352222]}
        zoom={10}
        scrollWheelZoom={true}
        attributionControl={false}
        ref={setMap}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {features && (
          <GeoJSON
            key={"gejson-data"}
            data={features}
            style={selectFeatureStyle}
          />
        )}
        {props.children}
      </MapContainer>
    </div>
  );
};

export default Map;
