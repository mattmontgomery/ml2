import { Request, Response, NextFunction } from "express";
import fileStats from "../fileStats";
import manipulate, {
  parseInstructions,
  parseInstructionsOrder,
  stringifyInstructions
} from "../manipulate";
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
  const newFilename = `${stringifyInstructions(instructions)}-${
    req.params.imagePath
  }`;
  const image = manipulate({
    instructions,
    instructionsOrder,
    imagePath: path.join(req.app.get("mediaPath"), req.params.imagePath)
  });
  const outputPath = path.join(
    req.app.get("mediaPath"),
    "resized",
    newFilename
  );
  image.toFile(outputPath);
  res.json({
    params: req.params.imageSize,
    stats,
    instructions,
    instructionsOrder,
    newFilename,
    outputPath
  });
  next();
}
