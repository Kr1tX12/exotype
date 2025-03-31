import { NextRequest } from "next/server";
import { handleGet } from "./handlers/get";

export async function GET(request: NextRequest) {
  return handleGet(request);
}
