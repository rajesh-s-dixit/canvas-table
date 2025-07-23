import type { IColumnConfig } from "./columnConfig";

export interface ICellData {
  row: any,
  column: IColumnConfig,
  rowIndex: number,
  columnIndex: number,
  xOffset: number,
  yOffset: number
}