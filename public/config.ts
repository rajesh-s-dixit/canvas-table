import type { IColumnConfig } from "../src/types/columnConfig";
import type { ITableConfig } from "../src/types/tableConfig";

const columns: IColumnConfig[] = [
  {
    header: "Name",
    field: "name",
    width: 150,
    sortable: true
  },
  {
    header: "Age",
    field: "age",
    width: 100,
    sortable: true
  },
  {
    header: "Email",
    field: "email",
    width: 200,
    sortable: false
  }
];

export const tableConfig: ITableConfig = {
  columns: columns,
  data: [
    { name: "John Doe", age: 30, email: ""},
    { name: "Jane Smith", age: 25, email: "jane@example.com" },
    { name: "Jane Smith", age: 25, email: "jane@example.com" },
    { name: "Jane Smith", age: 25, email: "jane@example.com" },
    { name: "Jane Smith", age: 25, email: "jane@example.com" },
    { name: "Jane Smith", age: 25, email: "jane@example.com" },
  ],
  theme: "light" // Default theme, can be customized
}