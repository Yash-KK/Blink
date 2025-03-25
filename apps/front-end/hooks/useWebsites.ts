"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";

type Websites = {
  id: string;
  url: string;
  ticks: {
    id: string;
    createdAt: string;
    status: string;
    latency: number;
  }[];
};
const useWebsites = () => {
  const { getToken } = useAuth();
  const [websites, setWebsites] = useState<Websites[]>([]);

  const refreshWebsites = async () => {
    const token = await getToken();
    const response = await axios.get("http://localhost:8081/api/v1/websites", {
      headers: {
        Authorization: token,
      },
    });
    setWebsites(response.data.websites);
  };

  useEffect(() => {
    refreshWebsites();

    const interval = setInterval(
      () => {
        refreshWebsites();
      },
      1000 * 60 * 1
    );

    return () => clearInterval(interval);
  }, []);

  return { websites, refreshWebsites };
};

export default useWebsites;
