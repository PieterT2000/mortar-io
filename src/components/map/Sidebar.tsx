import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { MapFeaturesWithStyle } from "@/types";
import { useMap } from "@/hooks/useMap";

type SidebarProps = {
  features?: MapFeaturesWithStyle;
  isPending: boolean;
};

const Sidebar = (props: SidebarProps) => {
  const { features, isPending } = props;
  const [activeFeature, setActiveFeature] = useState<number>();

  const { map } = useMap();

  useEffect(() => {
    if (map.current && activeFeature !== undefined && features) {
      // leaflet functions expect [lat, lng] but geojson is [lng, lat]
      const leafletCenter = features.features[activeFeature].properties
        .center!.slice()
        .reverse() as [number, number];
      map.current.flyTo(leafletCenter, 16, {
        duration: 2,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, activeFeature]);

  return (
    <div className="w-[350px] px-6 py-8 space-y-8">
      <h3 className="scroll-m-20 text-4xl font-semibold tracking-tight">
        Features
      </h3>
      <div className="space-y-4">
        {isPending &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={"skeleton" + i} className="space-y-2">
              <Skeleton className="h-3 w-full bg-skeleton" />
              <Skeleton className="h-3 w-[80%] bg-skeleton-2" />
            </div>
          ))}
        {features?.features.map((feature, idx) => (
          <button
            key={feature.properties.region}
            className={cn(
              "w-full bg-muted px-2 py-2 rounded-md shadow-sm cursor-pointer transition-colors hover:bg-skeleton",
              "flex justify-between",
              activeFeature === idx && "outline outline-2",
              `outline-${feature.properties.color}`
            )}
            onClick={() => setActiveFeature(idx)}
          >
            <div className="space-y-2 flex flex-col items-start">
              <div>
                {feature.properties
                  .center!.map((n: number) => n.toFixed(4))
                  .join(", ")}
              </div>
              <div className="text-muted-foreground">
                Region: {feature.properties.region}
              </div>
            </div>
            <span
              style={{ backgroundColor: feature.properties.color }}
              className={`inline-block w-4 h-4 rounded-full`}
            ></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
