import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Кэш для хранения предзагруженных марковских цепей
const chainCache = new Map<string, unknown>();

// Предзагрузка данных марковских цепей при инициализации сервера
const preloadChainData = () => {
  try {
    const aiDir = path.join(process.cwd(), "public", "ai");
    const files = fs.readdirSync(aiDir);

    files.forEach((file) => {
      const ext = path.extname(file); // например, ".json"
      if (ext !== ".json") return; // обрабатываем только JSON-файлы

      const lang = path.basename(file, ext); // извлекаем язык, например "ru" из "ru.json"
      const filePath = path.join(aiDir, file);
      const fileData = fs.readFileSync(filePath, "utf-8");
      chainCache.set(lang, JSON.parse(fileData));
    });
  } catch (error) {
    console.error("Error preloading chain data:", error);
  }
};

preloadChainData();

export async function GET(req: NextRequest) {
  const language = req.nextUrl.searchParams.get("lang") || "ru";

  try {
    const cachedChain = chainCache.get(language);
    if (!cachedChain) throw new Error("Language not found");

    return NextResponse.json(cachedChain, {
      headers: {
        "Cache-Control": "no-cache",
        "CDN-Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка загрузки цепи" },
      { status: 500 }
    );
  }
}
