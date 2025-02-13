
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
    try {
        // Получаем параметры из URL
        const language = req.nextUrl.searchParams.get("lang") || "ru";
        const wordsCount = parseInt(req.nextUrl.searchParams.get("words") || '10');

        // Формируем путь к файлу
        const filePath = path.join(process.cwd(), "public", "words", language, "words.json");

        // Читаем JSON-файл
        const fileData = fs.readFileSync(filePath, "utf-8");
        const words = JSON.parse(fileData).words;

        const selectedWords = words.slice(0, wordsCount);

        // Отправляем ответ
        return NextResponse.json({ words: selectedWords });
    } catch (error) {
        return NextResponse.json({ error: "Ошибка загрузки слов" }, { status: 500 });
    }
}
