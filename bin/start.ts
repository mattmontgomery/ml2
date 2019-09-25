import * as express from "express";
import imageRoute from "../src/routes/image";
import imageManipulateRoute from "../src/routes/imageManipulate";

const app = express();

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
