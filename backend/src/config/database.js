import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let memoryServer;

export async function connectDatabase() {
  const shouldUseMemoryDb = process.env.USE_MEMORY_DB === "true" || !process.env.MONGODB_URI;

  // Permite probar la API localmente aunque el equipo no tenga MongoDB instalado.
  if (shouldUseMemoryDb) {
    memoryServer = await MongoMemoryServer.create({
      instance: {
        dbName: "helpdesk_datacenter"
      }
    });
  }

  const uri = shouldUseMemoryDb ? memoryServer.getUri() : process.env.MONGODB_URI;

  await mongoose.connect(uri);
  console.log(`Base de datos conectada: ${shouldUseMemoryDb ? "MongoDB temporal" : "MongoDB"}`);
}

export async function disconnectDatabase() {
  await mongoose.disconnect();

  if (memoryServer) {
    await memoryServer.stop();
  }
}
