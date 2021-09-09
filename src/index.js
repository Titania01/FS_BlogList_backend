const App = require("../src/app");
const port = require("../utils/config").PORT;
const logger = require("../utils/logger");
const express = require("express");
const server = express();

App.listen(port, () => {
  logger.info(`server running on PORT ${port}`);
});
