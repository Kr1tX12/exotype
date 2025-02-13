import { FeaturesEditor } from "./features-editor/features-editor";
import { ModeEditor } from "./mode-editor/mode-editor";
import { ParamsEditor } from "./params-editor/params-editor";

export const ActionsBar = () => {
  return (
    <div className="w-full flex gap-2 justify-center px-12">
      <FeaturesEditor />
      <ModeEditor />
      <ParamsEditor />
    </div>
  );
};
