"use client";
import React, { useState, useEffect } from "react";
import { Moon, Sun, Plus } from "lucide-react";
import { Button } from "@/components/Button";
import { CreateWebsiteModal } from "@/components/CreateWebsiteModal";
import { Website, WebsiteCard } from "@/components/WebsiteCard";

// Mock data
const initialWebsites: Website[] = [
  {
    id: "1",
    name: "Main Website",
    url: "https://example.com",
    status: "up",
    uptimeHistory: Array(10).fill("up"),
  },
  {
    id: "2",
    name: "API Service",
    url: "https://api.example.com",
    status: "down",
    uptimeHistory: [...Array(8).fill("up"), "down", "down"],
  },
  {
    id: "3",
    name: "Documentation",
    url: "https://docs.example.com",
    status: "up",
    uptimeHistory: Array(10).fill("up"),
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [websites, setWebsites] = useState<Website[]>(initialWebsites);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Enable dark mode by default
    document.documentElement.classList.add("dark");
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleAddWebsite = (
    website: Omit<Website, "id" | "uptimeHistory" | "status">
  ) => {
    const newWebsite: Website = {
      ...website,
      id: Math.random().toString(36).substr(2, 9),
      status: "up",
      uptimeHistory: Array(10).fill("up"),
    };
    setWebsites([...websites, newWebsite]);
    setIsModalOpen(false);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white">
            Uptime Dashboard
          </h1>
          <div className="flex gap-4">
            <Button onClick={() => setIsModalOpen(true)} variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Website
            </Button>
            <Button onClick={toggleDarkMode} variant="secondary">
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {websites.map((website) => (
            <WebsiteCard key={website.id} website={website} />
          ))}
        </div>
      </div>

      <CreateWebsiteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddWebsite}
      />
    </div>
  );
}

export default App;
