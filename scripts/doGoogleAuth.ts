import { authenticate } from "@google-cloud/local-auth";
import { fromFileUrl } from "deno-std/path/posix/from_file_url.ts";

try {
  const auth = authenticate({
    keyfilePath: fromFileUrl(
      import.meta.resolve("../secrets/client-secret.json"),
    ),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const { credentials } = await auth;

  await Deno.writeTextFile(
    fromFileUrl(
      import.meta.resolve("../secrets/credentials.json"),
    ),
    JSON.stringify(credentials, null, 2),
  );
} catch (error) {
  console.error("Google auth faile due to error:", (error as Error).message);
}
