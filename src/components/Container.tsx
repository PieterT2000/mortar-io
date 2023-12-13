import Map from "@/components/map/Map";
import Sidebar from "./map/Sidebar";
import { useCustomFeatureStyle } from "@/hooks/useFeatureStyling";
import { useMapFeatures } from "@/hooks/useMapFeatures";

const Container = () => {
  const { data: features, isPending } = useMapFeatures();
  const featuresWithStyle = useCustomFeatureStyle(features);

  return (
    <div className="flex overflow-x-hidden relative">
      <Map className="w-full" features={featuresWithStyle} />
      <Sidebar features={featuresWithStyle} isPending={isPending} />
    </div>
  );
};

export default Container;
