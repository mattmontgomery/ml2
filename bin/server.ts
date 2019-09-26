import * as express from "express";
import Config, { applyConfigToExpressApp } from "../src/Config";
import imageRoute from "../src/routes/image";
import imageManipulateRoute from "../src/routes/imageManipulate";

import * as path from "path";
import parseConfigFromProcessEnv from "../src/Config";

process.env.MEDIA_PATH = path.join(__dirname, "..", process.env.MEDIA_PATH);

const config = parseConfigFromProcessEnv();
const app = applyConfigToExpressApp(express(), config);

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header({
      "X-ML-Version": "1.0.0"
    });
    console.log(`[${req.method}] ${req.url}`);
    next();
  }
);
app.get("/image/:imagePath", imageRoute);
app.get("/image/:imagePath/:imageInstructions", imageManipulateRoute);
app.listen(3000);
