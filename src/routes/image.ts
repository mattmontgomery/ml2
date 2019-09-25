import { Stats } from "fs";
import * as path from "path";

import fileStats from "../fileStats";
import { Request, Response, NextFunction } from "express";

export default async function image(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const stats = await fileStats(req.params.imagePath);
  res.json({
    message: "hello",
    headers: req.headers,
    exists: !!stats ? "yes" : "nah"
  });
  next();
}
