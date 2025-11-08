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
import cors from "cors"

const app = express();
app.use(cors())
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
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET
    );
    res.status(201).json({
      message: "Signup successful",
      token:token,
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

app.get("/validate-token", (req, res) => {
  const authHeader = req.headers.authorization; 

  if (!authHeader) {
    return res.status(401).json({ valid: false, message: "Missing Authorization header" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ valid: false, message: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    return res.status(403).json({ valid: false, message: "Invalid or expired token" });
  }
});


app.post("/room", middleware, async (req, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
   
    const userId = req.userId;

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId!
            }
        })

        res.json({
            roomId: room.id
        })
    } catch(e) {
        res.status(411).json({
            message: "Room already exists with this name"
        })
    }
})

app.get("/chats/:roomId",middleware, async (req, res) => {
    try {
        const roomId = Number(req.params.roomId);
        console.log(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 1000
        });

        res.json({
            messages
        })
    } catch(e) {
        console.log(e);
        res.json({
            messages: []
        })
    }
    
})

app.get("/room/:slug",middleware, async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    });

    res.json({
        room
    })
})


app.listen(8000, () => {
  console.log("server is ruuning ");
});
