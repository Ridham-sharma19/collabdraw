import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

interface UserJwtPayload extends jwt.JwtPayload {
  userId: string;
}

export function middleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

 
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid Authorization format" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as UserJwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(403).json({ message: "Invalid or expired token" });
  }
}
