import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("kutirUser"));

  // 1️⃣ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Multiple roles allowed (NEW)
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ Single role check (BACKWARD COMPATIBLE)
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
