import fs from "fs";
import path from "path";

export function loadFlow(flowId: string) {
  const flowPath = path.join(process.cwd(), "parlios_flows", `${flowId}.json`);

  if (!fs.existsSync(flowPath)) {
    throw new Error(`Flow not found: ${flowId}`);
  }

  const raw = fs.readFileSync(flowPath, "utf-8");
  return JSON.parse(raw);
}
