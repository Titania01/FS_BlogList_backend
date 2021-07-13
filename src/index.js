import App from "./app";
const http = require("http");
import { PORT } from "./../utils/config";
const logger = require("../utils/logger");

const server = http.createServer(App);
console.log(PORT);
server.listen(PORT, () => {
  logger.info(`server running on PORT ${PORT}`);
});
