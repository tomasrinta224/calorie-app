import React, { ReactElement } from "react";

import { Routes, Route } from "react-router-dom";
import NewFood from "pages/NewFood";
import FoodList from "pages/FoodList";
import EditFood from "pages/EditFood";
import Report from "pages/Report";
import Unauthorized from "pages/UnAuthorized";
import { useAuth } from "context/AuthContext";

export default function Router() {
  const { userInfo } = useAuth();

  const AdminRoute = ({ children }: { children: ReactElement }) =>
    userInfo.isAdmin ? children : <Unauthorized />;

  return (
    <Routes>
      <Route path="/new-food" element={<NewFood />} />
      <Route path="/food-list" element={<FoodList />} />
      <Route path="/edit-food/:foodId" element={<EditFood />} />
      <Route
        path="/report"
        element={
          <AdminRoute>
            <Report />
          </AdminRoute>
        }
      />
    </Routes>
  );
}
