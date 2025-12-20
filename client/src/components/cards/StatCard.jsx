export default function StatCard({
  title,
  value,
  subtitle,
  highlight,
  success,
}) {
  let valueColor = "text-gray-900";

  if (highlight) valueColor = "text-yellow-500";
  if (success) valueColor = "text-green-600";

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className={`text-2xl font-bold mt-2 ${valueColor}`}>
        {value}
      </h2>

      {subtitle && (
        <p className="text-sm text-gray-600 mt-2">{subtitle}</p>
      )}
    </div>
  );
}