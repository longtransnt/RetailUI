import { Link, Navigate } from "react-router-dom";
import Users from "./Users";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  matchPath,
} from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import PriceTable from "views/PriceTable";
import routes from "../routes";
import addDebts from "views/AddDebt";
import sidebarImage from "assets/img/sidebar-3.jpg";
import Dashboard from "views/Dashboard";
import User from "views/UserProfile";
import AddPrice from "views/AddPrice";
import AddDebt from "views/AddDebt";
import SheetImport from "views/SheetImport";
const Admin = () => {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <div className="dashboard">
      <div>
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="debts" element={<AddDebt />} />
              <Route path="sheetimport" element={<SheetImport />} />
              <Route path="table" element={<PriceTable />} />
              <Route path="addprice" element={<AddPrice />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
      <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      />
    </div>
  );
};

export default Admin;
