"use client";
import React, { useState, useMemo } from "react";
import { MonitorUp, Plus } from "lucide-react";
import axios from "axios";
import { RedirectToSignIn, useAuth } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion"; // Import motion
import useWebsites from "@/hooks/useWebsites";
import WebsiteCard, { UptimeStatus } from "@/components/WebsiteCard";
import CreateWebsiteModal from "@/components/CreateWebsiteModal";

function Dashboard() {
  const { getToken, userId } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { websites, refreshWebsites } = useWebsites();

  const handleCloseModal = async (url: string | null) => {
    if (url === null || url.trim() === "") {
      setIsModalOpen(false);
      return;
    }

    const token = await getToken();
    setIsModalOpen(false);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/website`,
        { url },
        { headers: { Authorization: token } }
      )
      .then(() => {
        refreshWebsites();
      });
  };

  const processedWebsites = useMemo(() => {
    return websites.map((website) => {
      const sortedTicks = [...website.ticks].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const recentTicks = sortedTicks.filter(
        (tick) => new Date(tick.createdAt) > thirtyMinutesAgo
      );

      const windows: UptimeStatus[] = [];
      for (let i = 0; i < 10; i++) {
        const windowStart = new Date(Date.now() - (i + 1) * 3 * 60 * 1000);
        const windowEnd = new Date(Date.now() - i * 3 * 60 * 1000);

        const windowTicks = recentTicks.filter((tick) => {
          const tickTime = new Date(tick.createdAt);
          return tickTime >= windowStart && tickTime < windowEnd;
        });

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

      const totalTicks = sortedTicks.length;
      const upTicks = sortedTicks.filter(
        (tick) => tick.status === "Good"
      ).length;
      const uptimePercentage =
        totalTicks === 0 ? 100 : (upTicks / totalTicks) * 100;

      const currentStatus = windows[windows.length - 1];
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

  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  if (userId == undefined) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 transition-colors duration-200">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <MonitorUp className="w-8 h-8 text-red-300" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Uptime Monitor
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl 
    dark:bg-white dark:text-black bg-black text-white"
            >
              <div className="absolute inset-0 bg-black/5 transition-opacity group-hover:bg-black/10 dark:bg-white/5 dark:group-hover:bg-white/10"></div>

              <div className="relative z-10 flex items-center justify-center space-x-3 px-4 py-2">
                <Plus
                  className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180 
        dark:text-black text-white"
                />
                <span className="font-semibold text-lg tracking-wide">
                  Add Website
                </span>
              </div>
            </button>
          </div>
        </div>

        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 },
            },
          }}
        >
          <AnimatePresence>
            {processedWebsites.map((website, index) => (
              <motion.div
                key={website.id}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
              >
                <WebsiteCard website={website} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <CreateWebsiteModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default Dashboard;
