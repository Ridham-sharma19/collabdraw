import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware.js";
import {
  CreateUserSchema,
  SigninSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.json({
      message: "Incorrect Inputs",
    });
  }
  try {
    const user = await prismaClient.user.create({
      data: {
        name: parsedData.data?.name,
        email: parsedData.data?.email,
        password: parsedData.data?.password,
      },
    });
    res.status(201).json({
      userId: user.id,
    });
  } catch (error) {
    res.status(411).json({
      message: `error:${error}`,
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.email,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    res.status(403).json({
      message: "Not authorized",
    });
    return;
  }

  const token = jwt.sign(
    {
      userId: user?.id,
    },
    JWT_SECRET!
  );

  res.json({
    token,
  });
});
app.post("room", (req, res) => {});

app.listen(8000, () => {
  console.log("server is ruuning ");
});
