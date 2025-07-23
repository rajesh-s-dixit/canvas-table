import type { IColumnConfig } from "../table/types/columnConfig";
import type { ITableConfig } from "../table/types/tableConfig";

const data = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Name ${i + 1}`,
  age: 20 + (i % 30),
  email: `user${i + 1}@example.com`,
  address: `Address ${i + 1}`,
  city: `City ${i % 10}`,
  country: `Country ${i % 5}`,
  phone: `123-456-78${(i % 100).toString().padStart(2, '0')}`,
  company: `Company ${i % 20}`,
  jobTitle: `Job ${i % 15}`,
  department: `Dept ${i % 8}`,
  salary: 30000 + (i * 100),
  isActive: i % 2 === 0,
  joinDate: `2022-01-${(i % 28 + 1).toString().padStart(2, '0')}`,
  lastLogin: `2025-07-${(i % 28 + 1).toString().padStart(2, '0')}T12:00:00Z`,
  notes: `Notes for user ${i + 1}`
}));


const columns2: IColumnConfig[] = [
  { header: "ID", field: "id", width: 80, sortable: true },
  { header: "Name", field: "name", width: 150, sortable: true },
  { header: "Age", field: "age", width: 80, sortable: true },
  { header: "Email", field: "email", width: 200, sortable: true },
  { header: "Address", field: "address", width: 200, sortable: false },
  { header: "City", field: "city", width: 120, sortable: true },
  { header: "Country", field: "country", width: 120, sortable: true },
  { header: "Phone", field: "phone", width: 140, sortable: false },
  { header: "Company", field: "company", width: 150, sortable: true },
  { header: "Job Title", field: "jobTitle", width: 150, sortable: true },
  { header: "Department", field: "department", width: 120, sortable: true },
  { header: "Salary", field: "salary", width: 120, sortable: true },
  { header: "Active", field: "isActive", width: 100, sortable: true },
  { header: "Join Date", field: "joinDate", width: 140, sortable: true },
  { header: "Last Login", field: "lastLogin", width: 180, sortable: false },
  { header: "Notes", field: "notes", width: 200, sortable: false }
];

export const tableConfig2: ITableConfig = {
  columns: columns2,
  data: data,
  theme: "dark" // Default theme, can be customized
};
