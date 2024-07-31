import "dotenv/config";

export const config = {
	PORT: process.env.APP_PORT ?? 3000,
	APP_NAME: process.env.APP_NAME ?? "leaf-microframework",
	VERSION: process.env.APP_VERSION ?? "0.0.1",
	ENVIROMENT: process.env.NODE_ENV ?? "development",
};
