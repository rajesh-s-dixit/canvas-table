import {useState} from "react";
import { CanvasTable } from "@components/table";
import { tableConfig } from "@public/config";
import { tableConfig2 } from "@public/config2";

export const Homepage = () => {
  const [config, setConfig] = useState(tableConfig);
  const handleChange = ({target}) => setConfig(target.value === "config1" ? tableConfig : tableConfig2);
  return (
    <div className="homepage-container background-gray-100 p-4 margin-auto overflow-y-auto h-9/10">
      <div className="flex justify-between items-center mb-4">
        Choose a config:
        <select
          className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
          onChange={handleChange}
        >
          <option value="config1">Config 1</option>
          <option value="config2">Config 2</option>
        </select>
      </div>
      <div className="flex w-full h-fit overflow-y-auto">
        <CanvasTable config={config} />
      </div>
    </div>
  );
}