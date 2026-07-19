import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDatabase } from "./config/database.js";

dotenv.config();

const port = process.env.PORT || 3000;

await connectDatabase();

app.listen(port, () => {
  console.log(`API Help Desk disponible en http://localhost:${port}`);
});
