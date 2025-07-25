import { useEffect, useMemo, useState } from "react";
import { createHeaderFilter, getTheme } from "./utils";
import type { ITableConfig } from "./types";

export interface IFilterTableProps {
  config: ITableConfig;
}

export interface IFilterElementProps {
  field: string;
  options: string[];
  offset: { xOffset: number };
  theme: any; // Define the theme type as needed
  filterKey: string;
  setFilterKey: (key: string) => void;
  addFilter: (filter: { [key: string]: string }) => void;
}

export const FilterContainer = ({ config }: IFilterTableProps) => {
  const [options, xOffset] = createHeaderFilter(config);
  const [filterKey, setFilterKey] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    console.log(filters);
    setFilterKey("");
  }, [filters]);

  return (
    <div className="header-filters-container relative">
      {Object.keys(options).map((key: string) => (
        <FilterElement
          key={key}
          field={key}
          options={options[key] as string[]}
          offset={xOffset[key] as { xOffset: number }}
          theme={config.theme}
          filterKey={filterKey}
          setFilterKey={(key: string) => setFilterKey(key)}
          addFilter={(filter) => setFilters((prev) => ({ ...prev, ...filter }))}
        />
      ))}
    </div>
  );
};

export const FilterElement = ({
  field,
  options,
  offset,
  theme,
  filterKey,
  setFilterKey,
  addFilter,
}: IFilterElementProps) => {
  const { headerText } = getTheme(theme);
  const showOptions = useMemo(() => field === filterKey, [field, filterKey]);
  return (
    <div
      key={field}
      data-field={field}
      className={`header-filter absolute z-10 top-0 left-${offset.xOffset} `}
      style={{ left: `${offset.xOffset}px`, color: headerText }}
      onClick={() => setFilterKey(field)}
    >
      &#x25BC;
      {showOptions && (
        <div className="filter-options absolute bg-white border border-gray-300 max-h-96 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              className="filter-option p-1 hover:bg-gray-200 cursor-pointer text-black min-w-32"
              onClick={() => addFilter({ [field]: option })}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
