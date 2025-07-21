import type { IColumnConfig } from "./columnConfig";

export interface ITableConfig {
  columns: IColumnConfig[]; // Array of column configurations
  data: any[]; // Array of data objects to be displayed in the table
  theme: string; // Optional theme for the table, can be used to style the table
}