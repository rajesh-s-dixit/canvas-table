export interface IColumnConfig {
  header: string; // The header text for the column
  field: string; // The field name in the data source that this column represents
  width?: number; // Optional width of the column
  sortable?: boolean; // Indicates if the column can be sorted
  editComponent?: string; // Optional component type for editing the column
  editComponentProps?: Record<string, any>; // Optional props for the edit component
}