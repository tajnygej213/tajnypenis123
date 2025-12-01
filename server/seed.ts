import { db } from "./db";
import { accessCodes } from "@shared/schema";
import { ACCESS_CODES } from "./access-codes";

async function seed() {
  try {
    console.log("🌱 Starting database seed...");
    
    // Seed access codes
    console.log(`📦 Seeding ${ACCESS_CODES.length} access codes...`);
    
    for (let i = 0; i < ACCESS_CODES.length; i += 100) {
      const batch = ACCESS_CODES.slice(i, i + 100);
      
      await db.insert(accessCodes).values(
        batch.map((code, idx) => ({
          code,
          productType: i + idx < 200 ? "obywatel" : "receipts",
          isUsed: "false",
        }))
      ).onConflictDoNothing();
      
      console.log(`✅ Seeded ${Math.min(i + 100, ACCESS_CODES.length)}/${ACCESS_CODES.length}`);
    }
    
    console.log("✨ Database seed complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
