import { Outlet, useLocation, useNavigate } from "react-router-dom";

function UserPanel() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab =
    location.pathname.split("/")[2] || "profile";

  const tabs = [
    { id: "profile", label: "My Profile" },
    { id: "addresses", label: "Addresses" },
    { id: "orders", label: "Orders" },
  ];

  return (
    <div className="min-h-screen  px-4 py-10">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-primary text-center mb-8">
        My Account
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="flex bg-white rounded-xl shadow border border-accent/20 overflow-hidden">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() =>
                navigate(`/user-panel/${tab.id}`)
              }
              className={`px-6 py-3 text-sm font-medium transition ${currentTab === tab.id
                ? "bg-accent text-cream"
                : "text-primary hover:bg-accent hover:text-cream"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content (ROUTED) */}
      <div className="max-w-5xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default UserPanel;
