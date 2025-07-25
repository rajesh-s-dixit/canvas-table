import type { ICellData, ITableConfig } from "../types";
import {
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_ROW_HEIGHT,
} from "../constants/constants";
import { drawRect, drawText } from "./canvasUtils";
import { gridThemes } from "../constants/gridTheme";

export const getTheme = (theme: string) => {
  switch (theme) {
    case "dark":
      return gridThemes.dark;
    case "light":
      return gridThemes.light;
    default:
      return gridThemes.light; // Default to light theme if not specified
  }
};

export const highlightCellBorder = (
  context: CanvasRenderingContext2D,
  cell: ICellData | null,
  themeName: string = "light",
) => {
  if (!cell) return;
  const theme = getTheme(themeName);
  const { xOffset, yOffset, column } = cell;
  const columnWidth = column.width || DEFAULT_COLUMN_WIDTH;
  const rowHeight = DEFAULT_ROW_HEIGHT;

  drawRect(
    context,
    theme.focusBorder,
    xOffset,
    yOffset,
    columnWidth,
    rowHeight,
  );
};

export const renderTable = (
  { data, columns, theme: themeName }: ITableConfig,
  context: CanvasRenderingContext2D,
) => {
  const theme = getTheme(themeName);
  let xOffset = 0;
  let yOffset = DEFAULT_ROW_HEIGHT;

  const headerStyle: Partial<CanvasRenderingContext2D> = {
    fillStyle: theme.headerText,
    font: "bold 14px Arial",
    textAlign: "center",
  };
  const cellStyle: Partial<CanvasRenderingContext2D> = {
    fillStyle: theme.rowText,
    font: "12px Arial",
    textAlign: "left",
  };

  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  let color = theme.headerBackground;
  [{}, ...data].forEach((row, rowIndex) => {
    xOffset = 0;
    yOffset = rowIndex * DEFAULT_ROW_HEIGHT;
    if (rowIndex > 0) {
      color = rowIndex % 2 !== 0 ? theme.rowBackground : theme.rowAltBackground;
    }
    columns.forEach((column) => {
      drawRect(
        context,
        theme.gridLine,
        xOffset,
        yOffset,
        column.width || DEFAULT_COLUMN_WIDTH,
        DEFAULT_ROW_HEIGHT,
      );

      drawBackground(
        context,
        color,
        xOffset,
        yOffset,
        column.width || DEFAULT_COLUMN_WIDTH,
        DEFAULT_ROW_HEIGHT,
      );

      if (rowIndex === 0) {
        drawText(
          context,
          column.header,
          headerStyle,
          xOffset + (column.width || DEFAULT_COLUMN_WIDTH) * 0.4,
          yOffset,
        );
      } else {
        drawText(context, row[column.field], cellStyle, xOffset, yOffset);
      }

      xOffset += column.width || DEFAULT_COLUMN_WIDTH;
    });
  });
};

export const createHeaderFilter = ({ data, columns }: ITableConfig) => {
  const filterOptions: { [key: string]: string[] } = {};
  const offset: { [key: string]: { xOffset: number } } = {};
  let xOffset = 0;
  columns.forEach((column) => {
    const temp: { [key: string]: boolean } = {};
    data.forEach((row) => (temp[row[column.field]] = true));
    filterOptions[column.field] = Object.keys(temp).sort();
    offset[column.field] = {
      xOffset: xOffset + (column.width || DEFAULT_COLUMN_WIDTH) - 20,
    };
    xOffset += column.width || DEFAULT_COLUMN_WIDTH;
  });
  return [filterOptions, offset];
};

const drawBackground = (
  context: CanvasRenderingContext2D,
  bgcolor: string,
  xOffset: number,
  yOffset: number,
  width: number,
  height: number,
) => {
  context.beginPath();
  context.fillStyle = bgcolor;
  context.fillRect(xOffset, yOffset, width, height);
  context.closePath();
};
