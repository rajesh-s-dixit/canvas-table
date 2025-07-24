import { useState, useMemo } from "react";
import { CanvasTable } from "../table";
import { tableConfig } from "../assets/config";
import { tableConfig2 } from "../assets/config2";

export const Homepage = () => {
  const [config, setConfig] = useState("config2");
  const handleChange = ({ target }) => setConfig(target.value);
  const configObj = useMemo(
    () => (config === "config1" ? tableConfig : tableConfig2),
    [config],
  );
  return (
    <div className="homepage-container background-gray-100 p-4 margin-auto overflow-y-auto h-9/10">
      <div className="flex justify-between w-64 items-center mb-4">
        Choose a config:
        <select
          className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
          onChange={handleChange}
          value={config}
        >
          <option value="config1">Config 1</option>
          <option value="config2">Config 2</option>
        </select>
      </div>
      <div className="flex w-full h-[80vh] overflow-y-auto">
        <CanvasTable config={configObj} />
      </div>
    </div>
  );
};
