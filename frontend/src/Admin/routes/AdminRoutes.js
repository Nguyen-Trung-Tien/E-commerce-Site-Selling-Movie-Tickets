import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Settings from "../pages/Settings";

function AdminRoutes() {
  return (
    <Router>
      <Switch>
        <Route path="/admin" exact component={Dashboard} />
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/admin/users" component={Users} />
        <Route path="/admin/settings" component={Settings} />
      </Switch>
    </Router>
  );
}

export default AdminRoutes;
