import { Map } from "leaflet";
import {
  MutableRefObject,
  createContext,
  useCallback,
  useMemo,
  useRef,
} from "react";

type MapProviderProps = {
  children: React.ReactNode;
};

export const MapContext = createContext<{
  map: MutableRefObject<Map | undefined>;
  setMap: (map: Map) => void;
}>({ map: { current: undefined }, setMap: () => {} });

export const MapProvider = ({ children }: MapProviderProps) => {
  const mapRef = useRef<Map>();

  const setMap = useCallback((map: Map) => {
    mapRef.current = map;
  }, []);

  const context = useMemo(() => {
    return { map: mapRef, setMap };
  }, []);

  return <MapContext.Provider value={context}>{children}</MapContext.Provider>;
};
