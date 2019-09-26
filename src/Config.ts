import { Application } from "express";

export interface EnvConfig {
  MEDIA_PATH?: string;
}

export interface Config {
  mediaPath?: string;
}

const configMapping: EnvConfig = {
  MEDIA_PATH: "mediaPath"
};

export default function parseConfigFromProcessEnv(): Config {
  return Object.keys(process.env).reduce((acc, curr) => {
    if (configMapping[curr]) {
      acc[configMapping[curr]] = process.env[curr];
    }
    return acc;
  }, {});
}

export function applyConfigToExpressApp(
  app: Application,
  config: Config
): Application {
  Object.keys(config).forEach(c => {
    app.set(c, config[c]);
  });
  return app;
}
