import React, { useState } from "react";
import { ChevronDown, ChevronUp, Globe } from "lucide-react";
import { clsx } from "clsx";

export interface Website {
  id: string;
  name: string;
  url: string;
  status: "up" | "down";
  uptimeHistory: ("up" | "down")[];
}

interface WebsiteCardProps {
  website: Website;
}

export const WebsiteCard: React.FC<WebsiteCardProps> = ({ website }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-200">
      <div
        className="p-6 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <div
            className={clsx(
              "w-3 h-3 rounded-full",
              website.status === "up" ? "bg-green-500" : "bg-red-500"
            )}
          />
          <div>
            <h3 className="text-lg font-semibold dark:text-white">
              {website.name}
            </h3>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Globe className="w-4 h-4 mr-1" />
              <span className="text-sm">{website.url}</span>
            </div>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        )}
      </div>

      {isExpanded && (
        <div className="px-6 pb-6">
          <div className="border-t dark:border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Last 30 Minutes Uptime
            </h4>
            <div className="flex space-x-1">
              {website.uptimeHistory.map((status, index) => (
                <div
                  key={index}
                  className={clsx(
                    "flex-1 h-8 rounded",
                    status === "up" ? "bg-green-500" : "bg-red-500"
                  )}
                  title={`${status === "up" ? "Operational" : "Down"}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
