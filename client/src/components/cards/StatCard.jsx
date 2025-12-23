export default function StatCard({
  title,
  value,
  subtitle,
  highlight,
  success,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2
        className={`text-2xl font-bold mt-2 ${
          success ? "text-green-600" : ""
        }`}
      >
        {value}
      </h2>

      {subtitle && (
        <p
          className={`text-sm mt-2 ${
            highlight ? "text-yellow-500" : "text-gray-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}