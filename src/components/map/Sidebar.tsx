import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MapFeaturesWithStyle } from "@/types";
import { useMapFlyToAnimation } from "@/hooks/useMapFlyToAnimation";
import { useState } from "react";

type SidebarProps = {
  features?: MapFeaturesWithStyle;
  isPending: boolean;
};

const Sidebar = (props: SidebarProps) => {
  const { features, isPending } = props;
  const [activeFeature, setActiveFeature] = useMapFlyToAnimation(features);
  const [open, setOpen] = useState(true);

  return (
    <div
      className={cn(
        "absolute right-0 min-w-[200px] md:w-[350px] transition-transform z-[999] bg-white h-full",
        !open && "translate-x-[100%]"
      )}
    >
      <Button
        className="absolute -left-[65px] top-[50%] translate-y-[-50%] -rotate-90  z-[999] rounded-b-none"
        variant={"default"}
        onClick={() => setOpen(!open)}
      >
        Features
      </Button>
      <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-8">
        <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight">
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
                "flex justify-between items-center sm:items-start",
                activeFeature === idx && "outline outline-2",
                `outline-${feature.properties.color}`
              )}
              onClick={() => setActiveFeature(idx)}
            >
              <div className="sm:space-y-2 flex flex-col items-start grow text-left">
                <div className="sm:space-x-2 w-full flex flex-col sm:flex-row sm:items-center">
                  <span>
                    {feature.properties.center
                      .map((n: number) => n.toFixed(3))
                      .join(", ")}
                  </span>
                  <span className="text-[14px] text-muted-foreground">
                    {feature.properties.area.toFixed(1)} m<sup>2</sup>
                  </span>
                </div>
                <div className="text-muted-foreground text-[14px]">
                  Region: {feature.properties.region}
                </div>
              </div>
              <span
                style={{ backgroundColor: feature.properties.color }}
                className={`inline-flex w-4 h-4 rounded-full`}
              ></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
