import express, { Request, Response } from "express";
import { serve } from "inngest/express";
import { inngest } from "./inngest";
import { logger } from "./utils/logger";
import { functions as inngestFunctions } from "./inngest/functions";

const app = express();
const PORT = 3001;

app.use(express.json());

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use(
  "/api/inngest",
  serve({ client: inngest, functions: inngestFunctions })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/chat", (req: Request, res: Response) => {
  res.send("Hi,how may i help you today?");
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Inggest endpoint: http://localhost:${PORT}/api/inngest`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
startServer();
