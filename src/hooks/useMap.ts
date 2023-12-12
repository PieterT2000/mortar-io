import { MapContext } from "@/providers/MapProvider";
import { useContext } from "react";

export const useMap = () => useContext(MapContext)