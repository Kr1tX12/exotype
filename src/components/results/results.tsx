import { Keyboard } from "../keyboard/keyboard";
import { SpeedChart } from "./components/charts/speed-chart";

export const Results = () => {
  return (
    <div className="container grid grid-cols-[1fr_170px_1fr] gap-6 max-xl:grid-cols-1">
      <div className="bg-muted/10 w-full min-w-96 rounded-lg py-4 px-9">
        <SpeedChart />
      </div>
      <div className="bg-muted/10 py-8 px-2 rounded-lg flex flex-col gap-8 text-center max-xl:-order-1">
        <div>
          <h1 className="text-5xl correct-letter-shadow">107</h1>
          <p className="text-foreground/70">WPM</p>
        </div>
        <div>
          <h1 className="text-5xl correct-letter-shadow">100%</h1>
          <p className="text-foreground/70">Точность</p>
        </div>
      </div>
      <div className="bg-muted/10 w-full rounded-lg p-9 min-w-96 flex items-center justify-center">
        <Keyboard scale={0.6} />
      </div>
    </div>
  );
};
