import { TestInfo } from "./test-info";

export const TestsList = () => {
  return (
    <div className="grid gap-2 overflow-y-auto h-72 px-4">
      {[0, 1, 2, 4, 5, 6].map((elem, index) => (
        <TestInfo key={index} />
      ))}
    </div>
  );
};
