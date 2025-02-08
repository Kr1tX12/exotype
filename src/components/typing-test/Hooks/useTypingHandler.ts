 // File: useTypingHandler.ts
 import { useEffect, useRef, useState } from "react";
 import gsap from "gsap";
 import { splitText } from "@/lib/utils";
 
 /*
   Хук useTypingHandler:
   - Управляет состоянием введённого текста (text) и исходным текстом (needText).
   - Отвечает за обработку ввода с клавиатуры.
   - Обработка пробела теперь выполняется без вставки переноса строки: просто добавляется пробел,
     что позволяет пользователю не вводить первую букву следующего слова вручную.
   - Позиционирование каретки происходит по последнему отображённому символу.
 */
 export const useTypingHandler = () => {
   const [text, setText] = useState("");
   // Исходный текст, который необходимо ввести.
   const needText = `Многие народы увлекаются расширением сознания. Для этого применяются различные вещества и заклинания. Расширив таким образом своё сознание, народы некоторое время охуевши наблюдают вращение бесконечного пространства, беседуют с Господом Богом или же с Сатаной — это кому как повезёт, а затем неизбежно возвращаются назад, домой — к толстой своей жене и аккуратным деткам, бреются и идут на службу. Многие народы увлекаются расширением сознания. Для этого применяются различные вещества и заклинания. Расширив таким образом своё сознание, народы некоторое время охуевши наблюдают вращение бесконечного пространства, беседуют с Господом Богом или же с Сатаной — это кому как повезёт, а затем неизбежно возвращаются назад, домой — к толстой своей жене и аккуратным деткам, бреются и идут на службу.`;
 
   // Разбиваем текст на части – предположим, что splitText возвращает массив строк/слов,
   // каждый элемент будет отрендерен с data-index для позиционирования каретки.
   const words = splitText(needText);
   const containerRef = useRef<HTMLDivElement>(null);
   const caretRef = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     const handleKeyDown = (e: KeyboardEvent) => {
       // Игнорируем модификаторные клавиши
       if (["Shift", "Alt", "Control", "Meta"].includes(e.key)) return;
 
       if (e.key === "Tab") {
         setText("");
       } else if (e.ctrlKey && e.key === "Backspace") {
         setText((prev) => {
           let i = prev.length - 1;
           while (i >= 0 && prev[i] === " ") i--;
           while (i >= 0 && prev[i] !== " ") i--;
           return prev.slice(0, i + 1);
         });
       } else if (e.key === "Backspace") {
         setText((prev) => prev.slice(0, -1));
       } else if (e.key === "Enter") {
         setText((prev) => prev + "\n");
       } else if (e.key === " ") {
         // Для пробела теперь всегда добавляем пробел без проверки на ширину строки.
         setText((prev) => {
           // Не добавляем последовательные пробелы
           if (prev.length > 0 && prev[prev.length - 1] === " ") return prev;
           return prev + " ";
         });
       } else if (e.key.length === 1) {
         setText((prev) => prev + e.key);
       }
     };
 
     document.addEventListener("keydown", handleKeyDown);
     return () => document.removeEventListener("keydown", handleKeyDown);
   }, [needText, text]);
 
   // Эффект для анимации и позиционирования каретки
   useEffect(() => {
     const container = containerRef.current;
     const caret = caretRef.current;
     if (!container || !caret) return;
 
     if (text.length === 0) {
       gsap.to(caret, { x: 0, y: 0, duration: 0.1, ease: "power1.out" });
       return;
     }
     const target = container.querySelector(`[data-index="${text.length - 1}"]`) as HTMLElement;
     if (!target) return;
     const letterWidth = target.offsetWidth;
     const caretX = target.offsetLeft + letterWidth;
     const caretY = target.offsetTop;
     gsap.to(caret, { x: caretX, y: caretY, duration: 0.1, ease: "power1.out" });
   }, [text, containerRef]);
 
   const progressValue = (text.length / needText.length) * 100;
   return { text, needText, words, progressValue, containerRef, caretRef };
 };
 
 export default useTypingHandler;