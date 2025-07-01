export default function Card({ children }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow p-4 rounded border border-gray-200 dark:border-gray-700">
      {children}
    </div>
  );
}
