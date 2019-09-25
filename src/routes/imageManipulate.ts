import { Request, Response, NextFunction } from "express";
import fileStats from "../fileStats";
import manipulate, {
  Instructions,
  parseInstructions,
  parseInstructionsOrder
} from "../manipulate";
import * as sharp from "sharp";
import * as path from "path";

export default async function imageManipulate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const stats = await fileStats(req.params.imagePath);
  const instructions = parseInstructions(req.params.imageInstructions);
  const instructionsOrder = parseInstructionsOrder(
    req.params.imageInstructions
  );
  const image = manipulate({
    instructions,
    instructionsOrder,
    imagePath: path.join(
      __dirname,
      "..",
      "..",
      "sample-data",
      req.params.imagePath
    )
  });
  const outputPath = path.join(
    __dirname,
    "..",
    "..",
    "sample-data",
    "resized",
    `${req.params.imageInstructions.replace(/:/g, "~")}-${req.params.imagePath}`
  );
  image.toFile(outputPath);
  res.json({
    params: req.params.imageSize,
    stats,
    instructions,
    instructionsOrder,
    outputPath
  });
  next();
}
