import Map from "@/components/map/Map";
import Sidebar from "./map/Sidebar";
import { useCustomFeatureStyle } from "@/hooks/useFeatureStyling";
import { useMapFeatures } from "@/hooks/useMapFeatures";

const Container = () => {
  const { data: features, isPending } = useMapFeatures();
  const featuresWithStyle = useCustomFeatureStyle(features);

  return (
    <div className="flex">
      <Map className="grow" features={featuresWithStyle} />
      <Sidebar features={featuresWithStyle} isPending={isPending} />
    </div>
  );
};

export default Container;
