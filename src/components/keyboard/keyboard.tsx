import { Keycap } from "./keycap";

type KeyboardProps = {
  scale?: number; // коэффициент масштабирования
};

type RowType = {
  value: string;
  shiftValue?: string;
  width?: number;
  textSize?: number;
}[];
export const Keyboard = ({ scale = 1 }: KeyboardProps) => {
  
  const baseKeyWidth = 36; // ширина для клавиши
  const baseKeyHeight = 36; // высота всех клавиш
  const baseTextSize = 16; // базовый размер текста

  const gapPx = 6;


  const row0: RowType = [
    { value: "`", shiftValue: "~" },
    { value: "1", shiftValue: "!" },
    { value: "2", shiftValue: "@" },
    { value: "3", shiftValue: "#" },
    { value: "4", shiftValue: "$" },
    { value: "5", shiftValue: "%" },
    { value: "6", shiftValue: "^" },
    { value: "7", shiftValue: "&" },
    { value: "8", shiftValue: "*" },
    { value: "9", shiftValue: "(" },
    { value: "0", shiftValue: ")" },
    { value: "-", shiftValue: "_" },
    { value: "=", shiftValue: "+" },
    { value: "bs", width: 66 },
  ];

  const row1: RowType = [
    { value: "Tab", width: 50, textSize: 10 },
    { value: "q" },
    { value: "w" },
    { value: "e" },
    { value: "r" },
    { value: "t" },
    { value: "y" },
    { value: "u" },
    { value: "i" },
    { value: "o" },
    { value: "p" },
    { value: "[", shiftValue: "{" },
    { value: "]", shiftValue: "}" },
    { value: "\\", shiftValue: "|", width: 52 },
  ];

  const row2: RowType = [
    { value: "Caps L", width: 65, textSize: 10 },
    { value: "a" },
    { value: "s" },
    { value: "d" },
    { value: "f" },
    { value: "g" },
    { value: "h" },
    { value: "j" },
    { value: "k" },
    { value: "l" },
    { value: ";", shiftValue: ":" },
    { value: "'", shiftValue: '"' },
    { value: "Enter", width: 79, textSize: 10 },
  ];

  const row3: RowType = [
    { value: "Shift", width: 85, textSize: 10 },
    { value: "z" },
    { value: "x" },
    { value: "c" },
    { value: "v" },
    { value: "b" },
    { value: "n" },
    { value: "m" },
    { value: ",", shiftValue: "<" },
    { value: ".", shiftValue: ">" },
    { value: "/", shiftValue: "?" },
    { value: "Shift", width: 101, textSize: 10 },
  ];

  const row4: RowType = [
    { value: "Ctrl", textSize: 10, width: 44 },
    { value: "Win", textSize: 10, width: 44 },
    { value: "Alt", textSize: 10, width: 44 },
    { value: "", width: 262 },
    { value: "Alt", textSize: 10, width: 44 },
    { value: "Win", textSize: 10, width: 44 },
    { value: "Con", textSize: 10, width: 44 },
    { value: "Ctrl", textSize: 10, width: 44 },
  ];

  const rows: RowType[] = [row0, row1, row2, row3, row4];

  return (
    <div
      className="flex flex-col"
      style={{ gap: `${gapPx * scale}px` }} // масштабируем gap между рядами
    >
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex"
          style={{ gap: `${gapPx * scale}px` }} // масштабируем gap между клавишами
        >
          {row.map((key, i) => (
            <Keycap
              key={i}
              value={key.value}
              style={{
                width: `${(key.width || baseKeyWidth) * scale}px`,
                height: `${baseKeyHeight * scale}px`,
                fontSize: `${(key.textSize || baseTextSize) * scale}px`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
