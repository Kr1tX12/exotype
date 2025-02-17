import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Кэш для хранения предзагруженных данных
const wordsCache = new Map<string, string[]>();

// Предзагрузка данных при инициализации сервера
const preloadWordsData = () => {
  try {
    const wordsDir = path.join(process.cwd(), "public", "words");
    const files = fs.readdirSync(wordsDir);

    files.forEach((file) => {
      const lang = path.basename(file, ".json");
      const filePath = path.join(wordsDir, file);
      const fileData = fs.readFileSync(filePath, "utf-8");
      wordsCache.set(lang, JSON.parse(fileData).words);
    });
  } catch (error) {
    console.error("Error preloading words data:", error);
  }
};

preloadWordsData();

export async function GET(req: NextRequest) {
  const language = req.nextUrl.searchParams.get("lang") || "ru";
  let wordsCount = parseInt(req.nextUrl.searchParams.get("words") || "10", 10);

  if (isNaN(wordsCount) || wordsCount < 1) wordsCount = 10;
  if (wordsCount > 1000) wordsCount = 1000;

  try {
    const cachedWords = wordsCache.get(language);
    if (!cachedWords) throw new Error("Language not found");

    const selectedWords = cachedWords.slice(0, wordsCount);
    
    return NextResponse.json(
      { words: selectedWords },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=300",
          "CDN-Cache-Control": "public, max-age=86400",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка загрузки слов" },
      { status: 500 }
    );
  }
}
