import Card from "../common/Card";

function VendorDashboard() {
  const stats = [
    { title: "Total Sales", value: "₹25,000" },
    { title: "Total Products", value: "18" },
    { title: "Pending Orders", value: "6" },
    { title: "Completed Orders", value: "58" },
    { title: "Wallet Balance", value: "₹6,400" },
    { title: "Total Earnings", value: "₹45,000" },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Dashboard Overview
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {stats.map((item, index) => (
          <Card key={index}>
            <p className="text-xs text-gray-500">{item.title}</p>
            <h2 className="text-lg font-bold text-primary mt-2">
              {item.value}
            </h2>
          </Card>
        ))}
      </div>

      {/* Monthly Sales Graph */}
      <Card className="mt-8">
        <p className="text-primary font-medium mb-3">
          Monthly Sales Graph
        </p>
        <div className="h-44 flex items-center justify-center text-gray-400">
          📈 Monthly earnings chart (API / Recharts ready)
        </div>
      </Card>
    </>
  );
}

export default VendorDashboard;
