import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Функция для чтения JSON-файла
async function readWordsFromFile(filePath: string, wordsCount: number): Promise<string[]> {
  try {
    // Считываем весь файл в память
    const fileData = fs.readFileSync(filePath, "utf-8");

    // Парсим JSON
    const allWords = JSON.parse(fileData).words;

    // Возвращаем первые `wordsCount` слов
    return allWords.slice(0, wordsCount);
  } catch (error) {
    throw new Error("Ошибка при чтении или парсинге файла");
  }
}

export async function GET(req: NextRequest) {
  // Получаем параметры запроса
  const language = req.nextUrl.searchParams.get("lang") || "ru";
  let wordsCount = parseInt(req.nextUrl.searchParams.get("words") || "10", 10);

  // Проверяем на корректность входного параметра
  if (isNaN(wordsCount)) {
    wordsCount = 10; // По умолчанию 10 слов
  }

  const filePath = path.join(process.cwd(), "public", "words", `${language}.json`);

  try {
    const selectedWords = await readWordsFromFile(filePath, wordsCount);

    // Выводим для отладки
    console.log("Выбранные слова:", selectedWords.length);

    return NextResponse.json(
      { words: selectedWords },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка загрузки слов" },
      { status: 500 }
    );
  }
}
