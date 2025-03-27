import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export type UptimeStatus = "good" | "bad" | "unknown";

function StatusCircle({ status }: { status: UptimeStatus }) {
  const colors = {
    good: "bg-green-400",
    bad: "bg-red-500",
    unknown: "bg-gray-500",
  };
  return <div className={`w-3 h-3 rounded-full ${colors[status]}`} />;
}

function UptimeTicks({ ticks }: { ticks: UptimeStatus[] }) {
  const colors = {
    good: "bg-green-400",
    bad: "bg-red-500",
    unknown: "bg-gray-500",
  };

  return (
    <div className="flex gap-1 mt-2">
      {ticks.map((tick, index) => (
        <div
          key={index}
          className={`w-8 h-2 rounded transition-all duration-300 ${colors[tick]}`}
        />
      ))}
    </div>
  );
}

interface ProcessedWebsite {
  id: string;
  url: string;
  status: UptimeStatus;
  uptimePercentage: number;
  lastChecked: string;
  uptimeTicks: UptimeStatus[];
}

export default function WebsiteCard({
  website,
}: {
  website: ProcessedWebsite;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border shadow-gray-500 shadow-lg border-gray-700 transition-transform hover:scale-[1.02]">
      <div
        className="p-3 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <StatusCircle status={website.status} />
          <div>
            <h3 className="text-lg font-semibold text-white">{website.url}</h3>
            <span className="text-sm text-gray-400">
              {website.uptimePercentage.toFixed(1)}% uptime
            </span>
          </div>
        </div>
        <div className="text-gray-400">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </div>

      {isExpanded && (
        <CardContent className="bg-gray-900 border-t border-gray-700 p-4">
          <div className="mb-3">
            <p className="text-sm text-gray-400">Last 30 minutes status:</p>
            <UptimeTicks ticks={website.uptimeTicks} />
          </div>
          <p className="text-xs text-gray-500">
            Last checked: {website.lastChecked}
          </p>
        </CardContent>
      )}
    </Card>
  );
}
