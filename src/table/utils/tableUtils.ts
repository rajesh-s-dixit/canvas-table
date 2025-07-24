// Highlights the border of a cell using the theme's focusBorder color
import {
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_ROW_HEIGHT,
} from "../constants/constants";
import type { IColumnConfig, ITableConfig, ICellData } from "../types";
import { createInput } from "../../components/domUtils";

export const getDimension = ({ data, columns }: ITableConfig) => {
  const totalWidth = columns.reduce((acc: number, column: IColumnConfig) => {
    return acc + (column.width || DEFAULT_COLUMN_WIDTH); // Default width if not specified
  }, 0);

  return {
    width: totalWidth,
    height: (data.length + 2) * DEFAULT_ROW_HEIGHT,
  };
};

export const getCell = (
  config: ITableConfig,
  event: React.MouseEvent<HTMLCanvasElement>,
): ICellData | null => {
  const { columns, data } = config;
  const { clientX: x, clientY: y, target } = event;
  const { top } = target.getBoundingClientRect();

  const rowHeight = DEFAULT_ROW_HEIGHT;
  const columnWidth = columns.map((col) => col.width || DEFAULT_COLUMN_WIDTH);

  // Calculate row index
  const rowIndex = Math.floor((y - top) / rowHeight) - 1; // -1 to account for header row
  if (rowIndex < 0 || rowIndex >= data.length) return null; // Out of bounds

  // Calculate column index
  let xOffset = 0;
  const columnIndex = columnWidth.findIndex((width) => {
    if (x >= xOffset && x < xOffset + width) {
      return true;
    }
    xOffset += width;
    return false;
  });

  if (columnIndex === -1) return null; // Out of bounds

  return {
    row: data[rowIndex],
    column: columns[columnIndex],
    rowIndex: rowIndex,
    columnIndex,
    xOffset,
    yOffset: (rowIndex + 1) * rowHeight, // yOffset is the top of the cell
  };
};

const getKeyOffset = (key: string) => {
  switch (key) {
    case "ArrowUp":
      return [0, -1]; // Move up
    case "ArrowDown":
      return [0, 1]; // Move down
    case "ArrowLeft":
      return [-1, 0]; // Move left
    case "ArrowRight":
      return [1, 0]; // Move right
    default:
      return [0, 0]; // No movement for other keys
  }
};

export const getCellDataFromIndex = (
  config: ITableConfig,
  rowIndex: number,
  columnIndex: number,
): ICellData | null => {
  const { columns, data } = config;
  if (
    rowIndex < 0 ||
    rowIndex >= data.length ||
    columnIndex < 0 ||
    columnIndex >= columns.length
  ) {
    return null; // Out of bounds
  }
  const column = columns[columnIndex];
  const row = data[rowIndex];
  const xOffset = columns
    .slice(0, columnIndex)
    .reduce((acc, col) => acc + (col.width || DEFAULT_COLUMN_WIDTH), 0);
  return {
    row,
    column,
    rowIndex,
    columnIndex,
    xOffset,
    yOffset: rowIndex * DEFAULT_ROW_HEIGHT, // yOffset is the top of the cell
  };
};

export const getNextCellData = (
  config: ITableConfig,
  key: string,
  cellData: ICellData,
) => {
  const [xDelta, yDelta] = getKeyOffset(key);
  const columnIndex = cellData!.columnIndex + xDelta;
  const rowIndex = cellData!.rowIndex + yDelta;

  if (
    rowIndex < 1 ||
    rowIndex >= config.data.length ||
    columnIndex < 0 ||
    columnIndex >= config.columns.length
  ) {
    return null; // Out of bounds
  }
  return getCellDataFromIndex(config, rowIndex, columnIndex);
};

export const removeInput = () => {
  const input = document.querySelector(".edit-cell-input");
  if (input) {
    input.remove();
  }
};
export const addInput = (cellData: ICellData) => {
  const data = cellData?.row[cellData.column.field];
  removeInput();
  createInput(data, {
    xOffset: cellData.xOffset,
    yOffset: cellData.yOffset,
    width: cellData.column.width || DEFAULT_COLUMN_WIDTH,
    height: DEFAULT_ROW_HEIGHT,
  });
};
