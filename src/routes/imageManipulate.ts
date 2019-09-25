import { Request, Response, NextFunction } from "express";
import fileStats from "../fileStats";
import * as sharp from "sharp";
import * as path from "path";

interface Instructions {
  resize?: string;
  gravity?: string;
  fit?: "contain" | "cover";
}

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
  const image = sharp(stats.path);
  console.log(instructions);
  instructionsOrder.forEach(instruction => {
    switch (instruction) {
      case "resize":
        const sizes = instructions[instruction].split("x");
        image.resize({
          width: parseInt(sizes[0], 10),
          height: parseInt(sizes[1], 10),
          fit: instructions.fit ? instructions.fit : "contain",
          position: instructions.gravity
        });
        break;
    }
  });
  const outputPath = path.join(
    __dirname,
    "..",
    "..",
    "sample-data",
    "resized",
    `${req.params.imageInstructions.replace(":", "~")}-${req.params.imagePath}`
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

function parseInstructions(imageParams: string): Instructions {
  return imageParams.split("|").reduce((acc, curr) => {
    return {
      ...acc,
      [curr.split(":")[0]]: curr.split(":")[1]
    };
  }, {});
}

function parseInstructionsOrder(imageParams: string): string[] {
  return imageParams.split("|").map(ins => ins.split(":")[0]);
}
