import * as path from "path";

import fileStats from "../fileStats";
import { Request, Response, NextFunction } from "express";

export default async function image(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const imagePath = path.join(req.app.get("mediaPath"), req.params.imagePath);
  const stats = await fileStats(imagePath);
  res.json({
    imagePath,
    exists: !!stats ? "yes" : "nah"
  });
  next();
}
