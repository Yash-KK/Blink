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
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/websites`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setWebsites(response.data.websites);
    } catch {
      console.log("error");
    }
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
