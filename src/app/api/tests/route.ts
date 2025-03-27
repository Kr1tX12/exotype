import { handleGet } from "./handlers/get";
import { handlePost } from "./handlers/post";

export async function GET() {
  return handleGet();
}
export async function POST(req: Request) {
  return handlePost(req);
}
