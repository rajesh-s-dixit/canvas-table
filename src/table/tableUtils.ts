// Highlights the border of a cell using the theme's focusBorder color
import { DEFAULT_COLUMN_WIDTH, DEFAULT_ROW_HEIGHT } from "./constants/constants";
import { gridThemes } from "./constants/gridTheme";
import type { IColumnConfig } from "./types/columnConfig";
import type { ITableConfig } from "./types/tableConfig";
import { createInput } from "../components/domUtils";
import type { ICellData } from "./types";

const getTheme = (theme: string) => {
  switch (theme) {
    case "dark":
      return gridThemes.dark;
    case "light":
      return gridThemes.light;
    default:
      return gridThemes.light; // Default to light theme if not specified
  }
}

export const getDimension = ({ data, columns }: ITableConfig) => {
  const totalWidth = columns.reduce((acc: number, column: IColumnConfig) => {
    return acc + (column.width || DEFAULT_COLUMN_WIDTH); // Default width if not specified
  }, 0);

  return {
    width: totalWidth,
    height: (data.length + 2) * DEFAULT_ROW_HEIGHT
  };
}

export const createBackground = (context: CanvasRenderingContext2D, themeName: string) => {
  const theme = getTheme(themeName);
  // Draw background using theme color
  context.fillStyle = theme.background;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

export const createGridLines = (config: ITableConfig, context: CanvasRenderingContext2D) => {
  createBackground(context, config.theme);
  const height = createRows(config, context);
  // createColumns(config, context, height);
}

export const createRows = ({ data, columns, theme: themeName }: ITableConfig, context: CanvasRenderingContext2D) => {
  const theme = getTheme(themeName);

  const rowHeight = DEFAULT_ROW_HEIGHT; // You can use DEFAULT_ROW_HEIGHT if defined
  let yOffset = rowHeight;
  const canvasWidth = context.canvas.width;

  // Draw horizontal lines for each row
  [{}, ...data].forEach((row, rowIndex) => {
    if (rowIndex === 0)
      context.fillStyle = theme.headerBackground;
    else
      context.fillStyle = rowIndex % 2 !== 0 ? theme.rowBackground : theme.rowAltBackground;
    context.fillRect(0, yOffset - rowHeight, canvasWidth, rowHeight); // Fill the row background

    context.beginPath();
    context.moveTo(0, yOffset);
    context.lineTo(canvasWidth, yOffset);
    context.strokeStyle = theme.gridLine;
    context.stroke();

    let xOffset = 0;

    columns.forEach((column) => {
      if (rowIndex === 0) {
        context.textAlign = "center";
        context.fillStyle = theme.headerText;
        context.font = "bold 14px Arial"; // Set font for header
        context.fillText(column.header || '', xOffset + (column.width! * 0.5), yOffset - 10); // Adjust text position as needed
      } else {
        context.font = "12px Arial"; // Set font for header
        context.textAlign = "left";
        context.fillStyle = theme.rowText;
        context.fillText(row[column.field] || '', xOffset + 5, yOffset - 10); // Adjust text position as needed
      }
      xOffset += column.width || DEFAULT_COLUMN_WIDTH;
    });

    yOffset += rowHeight;
  });
  return yOffset - rowHeight; // Return the final yOffset for further calculations if needed
}

export const createColumns = ({ columns, theme: themeName }: ITableConfig, context: CanvasRenderingContext2D, height: number) => {
  4
  const theme = getTheme(themeName);
  let xOffset = 0;

  columns.forEach((column) => {
    const width = column.width || DEFAULT_COLUMN_WIDTH;
    context.beginPath();
    context.moveTo(xOffset, 0);
    context.lineTo(xOffset, height);
    context.strokeStyle = theme.gridLine;
    context.stroke();

    xOffset += width;
  });
  // Draw last vertical line
  context.beginPath();
  context.moveTo(xOffset, 0);
  context.lineTo(xOffset, height);
  context.strokeStyle = theme.gridLine;
  context.stroke();
}

export const getCell = (config: ITableConfig, event: React.MouseEvent<HTMLCanvasElement>): ICellData | null => {
  const { columns, data } = config;
  const { clientX: x, clientY: y, target } = event;
  const { top } = target.getBoundingClientRect();

  const rowHeight = DEFAULT_ROW_HEIGHT;
  const columnWidth = columns.map(col => col.width || DEFAULT_COLUMN_WIDTH);

  // Calculate row index
  const rowIndex = Math.floor((y - top) / rowHeight); // -1 to account for header row
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
    row: data[rowIndex - 1],
    column: columns[columnIndex],
    rowIndex: rowIndex - 1,
    columnIndex,
    xOffset,
    yOffset: rowIndex * rowHeight, // yOffset is the top of the cell
  };
}

export const highlightCellBorder = (
  context: CanvasRenderingContext2D,
  cell: ICellData,
  themeName: string = "light",
) => {
  if (!cell) return;
  const theme = getTheme(themeName);
  const { xOffset, yOffset, column } = cell;
  const columnWidth = column.width || DEFAULT_COLUMN_WIDTH;
  const rowHeight = DEFAULT_ROW_HEIGHT;

  context.save();
  context.strokeStyle = theme.focusBorder;
  context.strokeRect(xOffset, yOffset, columnWidth, rowHeight);
  context.restore();
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
}

export const getCellDataFromIndex = (config: ITableConfig, rowIndex: number, columnIndex: number): ICellData | null => {
  const { columns, data } = config;
  if (rowIndex < 0 || rowIndex >= data.length || columnIndex < 0 || columnIndex >= columns.length) {
    return null; // Out of bounds
  }
  const column = columns[columnIndex];
  const row = data[rowIndex];
  const xOffset = columns.slice(0, columnIndex).reduce((acc, col) => acc + (col.width || DEFAULT_COLUMN_WIDTH), 0);
  return {
    row,
    column,
    rowIndex,
    columnIndex,
    xOffset,
    yOffset: rowIndex * DEFAULT_ROW_HEIGHT, // yOffset is the top of the cell
  };
}

export const getNextCellData = (config: ITableConfig, key: string, cellData: ICellData) => {
  const [xDelta, yDelta] = getKeyOffset(key);
  const columnIndex = cellData!.columnIndex + xDelta;
  const rowIndex = cellData!.rowIndex + yDelta;

  if (rowIndex < 0 || rowIndex >= config.data.length || columnIndex < 0 || columnIndex >= config.columns.length) {
    return null; // Out of bounds
  }
  return getCellDataFromIndex(config, rowIndex, columnIndex);
}

export const removeInput = () => {
  const input = document.querySelector(".edit-cell-input");
  if (input) {
    input.remove();
  }
}
export const addInput = (cellData: ICellData) => {
  const data = cellData?.row[cellData.column.field];
  removeInput();
  createInput(data, { xOffset: cellData.xOffset, yOffset: cellData.yOffset, width: cellData.column.width || DEFAULT_COLUMN_WIDTH, height: DEFAULT_ROW_HEIGHT });
}