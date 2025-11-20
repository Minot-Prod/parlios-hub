import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const flowId = searchParams.get("flowId");

    if (!flowId) {
      return new Response(JSON.stringify({ error: "Missing flowId" }), { status: 400 });
    }

    const file = path.join(process.cwd(), "parlios_flows", `${flowId}.json`);

    if (!fs.existsSync(file)) {
      return new Response(JSON.stringify({ error: "Flow not found" }), { status: 404 });
    }

    const raw = fs.readFileSync(file, "utf8");
    return new Response(raw, {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: "Internal error" }), { status: 500 });
  }
}
