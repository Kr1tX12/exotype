import ActivityCalendar from "react-activity-calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTime } from "@/lib/utils";
import { getDateDifference } from "@/lib/utils/getDateDifference";
import useBreakpoint from "@/hooks/useBreakpoint";
import { Tooltip } from "@/components/ui/tooltip";
import { useTypingPerDay } from "../../../hooks/useTypingPerDay";

export const ProfileActivityCalendar = () => {
  const { data: typingPerDay
    , isLoading, error } = useTypingPerDay();

  const sm = !useBreakpoint("sm");
  const md = !useBreakpoint("md");
  const lg = !useBreakpoint("lg");
  const xl = !useBreakpoint("xl");

  if (isLoading || !typingPerDay) {
    return <Skeleton className="w-full h-72" />;
  }

  if (error) {
    return (
      <div className="bg-muted/30 rounded-xl px-8 py-8">
        <h1>Ошибка</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (typingPerDay.length === 0) {
    return (
      <div className="bg-muted/30 rounded-xl px-8 py-8 h-full flex items-center justify-center">
        <h1 className="text-3xl font-bold">Нет данных</h1>
      </div>
    );
  }

  const maxTime = Math.max(...typingPerDay.map((day) => day.timeSec));

  const data = typingPerDay.map((day) => {
    const normalized = maxTime > 0 ? day.timeSec / maxTime : 0;
    const level = Math.min(4, Math.ceil(normalized * 4));
    return { date: day.date, count: day.timeSec, level };
  });

  if (
    getDateDifference(data[0].date, data[data.length - 1].date) < 31536000000
  ) {
    const date = `${+data[data.length - 1].date.slice(0, 4) - 1}${data[
      data.length - 1
    ].date.slice(4, data[data.length - 1].date.length)}`;
    data.unshift({
      date: date.toString(),
      count: 0,
      level: 0,
    });
  }

  return (
    <div className="bg-muted/30 rounded-xl pt-8 pb-2 px-8 size-full">
      <ActivityCalendar
        data={data}
        renderBlock={(block, activity) => (
          <Tooltip
            text={`${formatTime(activity.count * 1000)} в ${activity.date}`}
          >
            {block}
          </Tooltip>
        )}
        renderColorLegend={(block, level) => (
          <Tooltip text={`Level ${level}`}>{block}</Tooltip>
        )}
        blocksClassName="hover:!stroke-muted-foreground transition-[stroke] duration-1000 hover:duration-75"
        className="pb-2"
        theme={{
          dark: [
            "hsl(var(--primary) / .05)",
            "hsl(var(--primary) / .4)",
            "hsl(var(--primary) / .6)",
            "hsl(var(--primary) / .8)",
            "hsl(var(--primary))",
          ],
        }}
        blockRadius={sm ? 2 : md ? 3 : lg ? 4 : xl ? 5 : 6}
        blockSize={sm ? 8 : md ? 14 : lg ? 15 : xl ? 16 : 20}
        blockMargin={sm ? 2 : md ? 3 : lg ? 4 : xl ? 5 : 6}
      />
    </div>
  );
};
