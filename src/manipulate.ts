import * as sharp from "sharp";
import { Sharp } from "sharp";
export interface Instructions {
  resize?: string;
  gravity?: string;
  fit?: "contain" | "cover";
}
export interface Options {
  instructions: Instructions;
  instructionsOrder: string[];
  imagePath: string;
}

export default function manipulate({
  instructions,
  instructionsOrder,
  imagePath
}: Options): Sharp {
  const image = sharp(imagePath);
  instructionsOrder.forEach(instruction => {
    switch (instruction) {
      case "resize":
        const sizes = instructions[instruction].split("x");
        const width = parseInt(sizes[0], 10);
        const height = parseInt(sizes[1], 10);
        const options: sharp.ResizeOptions = {
          width,
          height,
          fit: instructions.fit ? instructions.fit : "contain",
          position: instructions.gravity
        };
        image.resize(width, height, options);
        break;
    }
  });
  return image;
}

export function parseInstructions(imageParams: string): Instructions {
  return imageParams.split("|").reduce((acc, curr) => {
    return {
      ...acc,
      [curr.split(":")[0]]: curr.split(":")[1]
    };
  }, {});
}

export function parseInstructionsOrder(imageParams: string): string[] {
  return imageParams.split("|").map(ins => ins.split(":")[0]);
}
