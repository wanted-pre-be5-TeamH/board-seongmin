const { createApp } = require("./app");

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  const server = app.listen(PORT, () => {
    console.log(`server listening on Port ${PORT}`);
  });

  server.setTimeout(5000);
};

startServer();
