import express, { type Request, type Response } from "express";
import { prisma } from "@repo/db";
import { authMiddleware } from "./middleware";

const app = express();
app.use(express.json());

app.post(
  "/api/v1/website",
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.userId as string;
    const { url } = req.body;

    const website = await prisma.website.create({
      data: {
        userId: userId,
        url: url,
      },
    });
    res.json({
      website: website,
      message: "created website instance",
    });
  }
);

app.post("/api/v1/website/status", async (req, res) => {
  const websiteId = req.query.websiteId as string;
  const userId = req.userId as string;
  const data = await prisma.website.findFirst({
    where: {
      id: websiteId,
      userId: userId,
    },
    include: {
      ticks: true,
    },
  });
  res.json(data);
});

app.get("/api/v1/websites", async (req, res) => {
  const userId = req.userId as string;
  const websites = await prisma.website.findMany({
    where: {
      userId: userId,
    },
  });

  res.json({
    websites: websites,
  });
});

app.listen(3001, () => {
  console.log("Listening to port: 3000");
});
