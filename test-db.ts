import { db } from "./src/lib/db";
async function main() {
  try {
    const user = await db.user.findFirst();
    console.log("Query success", user);
  } catch (e) {
    console.error("Query failed", e);
  }
}
main();
