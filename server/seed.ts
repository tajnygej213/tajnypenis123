import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { accessCodes } from "@shared/schema";
import { ALL_ACCESS_CODES } from "./access-codes";

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.log("⚠️ DATABASE_URL not set - skipping seed");
    return;
  }

  const sql = postgres(process.env.DATABASE_URL);
  const db = drizzle(sql);

  try {
    console.log("🌱 Seeding access codes...");

    // Batch insert codes
    for (let i = 0; i < ALL_ACCESS_CODES.length; i += 50) {
      const batch = ALL_ACCESS_CODES.slice(i, i + 50);
      
      await db.insert(accessCodes).values(
        batch.map((code: string, idx: number) => ({
          code,
          productType: i + idx < 200 ? "obywatel" : "receipts",
          isUsed: "false",
        }))
      ).onConflictDoNothing();
      
      console.log(`✅ ${Math.min(i + 50, ALL_ACCESS_CODES.length)}/${ALL_ACCESS_CODES.length}`);
    }

    console.log("✨ Seed done!");
    await sql.end();
  } catch (error) {
    console.error("❌ Seed failed:", error);
    await sql.end();
    process.exit(1);
  }
}

seed();
