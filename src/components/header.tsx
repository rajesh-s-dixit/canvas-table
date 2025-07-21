export const PageHeader = () => {
  return (
    <header className="flex bg-white dark:bg-gray-90 flex-row items-center justify-between shadow-md p-4">
      <h1>Canvas Table</h1>
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          Theme:
        </span>
        <select className="bg-gray-50 dark:bg-gray-800 flex-row border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </header>
  );
}