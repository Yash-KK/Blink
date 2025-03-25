"use client";
import React, { useState, useMemo } from "react";
import { Globe, Plus, Moon, Sun } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import useWebsites from "@/hooks/useWebsites";
import WebsiteCard, { UptimeStatus } from "@/components/WebsiteCard";
import CreateWebsiteModal from "@/components/CreateWebsiteModal";

function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { websites, refreshWebsites } = useWebsites();
  const { getToken } = useAuth();

  const handleCloseModal = async (url: string | null) => {
    if (url === null || url.trim() === "") {
      setIsModalOpen(false);
      return;
    }

    const token = await getToken();
    setIsModalOpen(false);
    axios
      .post(
        `http://localhost:8081/api/v1/website`,
        {
          url,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        refreshWebsites();
      });
  };
  const processedWebsites = useMemo(() => {
    return websites.map((website) => {
      // Sort ticks by creation time
      const sortedTicks = [...website.ticks].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Get the most recent 30 minutes of ticks
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const recentTicks = sortedTicks.filter(
        (tick) => new Date(tick.createdAt) > thirtyMinutesAgo
      );

      // Aggregate ticks into 3-minute windows (10 windows total)
      const windows: UptimeStatus[] = [];

      for (let i = 0; i < 10; i++) {
        const windowStart = new Date(Date.now() - (i + 1) * 3 * 60 * 1000);
        const windowEnd = new Date(Date.now() - i * 3 * 60 * 1000);

        const windowTicks = recentTicks.filter((tick) => {
          const tickTime = new Date(tick.createdAt);
          return tickTime >= windowStart && tickTime < windowEnd;
        });

        // Window is considered up if majority of ticks are up
        const upTicks = windowTicks.filter(
          (tick) => tick.status === "Good"
        ).length;
        windows[9 - i] =
          windowTicks.length === 0
            ? "unknown"
            : upTicks / windowTicks.length >= 0.5
              ? "good"
              : "bad";
      }

      // Calculate overall status and uptime percentage
      const totalTicks = sortedTicks.length;
      const upTicks = sortedTicks.filter(
        (tick) => tick.status === "Good"
      ).length;
      const uptimePercentage =
        totalTicks === 0 ? 100 : (upTicks / totalTicks) * 100;

      // Get the most recent status
      const currentStatus = windows[windows.length - 1];

      // Format the last checked time
      const lastChecked = sortedTicks[0]
        ? new Date(sortedTicks[0].createdAt).toLocaleTimeString()
        : "Never";

      return {
        id: website.id,
        url: website.url,
        status: currentStatus,
        uptimePercentage,
        lastChecked,
        uptimeTicks: windows,
      };
    });
  }, [websites]);

  // Toggle dark mode
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Globe className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Uptime Monitor
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add Website</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {processedWebsites.map((website) => (
            <WebsiteCard key={website.id} website={website} />
          ))}
        </div>
      </div>

      <CreateWebsiteModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default Dashboard;
