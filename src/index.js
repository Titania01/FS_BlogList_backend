import App from "../utils/app";
const http = require("http");
import { PORT } from "./../utils/config";
const logger = require("../utils/logger");

const server = http.createServer(App);

server.listen(PORT, () => {
  logger.info(`server running on PORT ${PORT}`);
});
