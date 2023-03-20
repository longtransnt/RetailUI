/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import PriceTable from "views/PriceTable";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Login from "views/Login.js";
import addDebts from "views/AddDebt";
import User from "views/UserProfile";
import AddPrice from "views/AddPrice";
import SheetImport from "views/SheetImport";
import AddDebt from "views/AddDebt";
const dashboardRoutes = [
  {
    path: "/price",
    name: "Bảng Giá Vàng",
    icon: "nc-icon nc-tv-2",
    component: PriceTable,
    layout: "/editor",
  },
  {
    path: "/addprice",
    name: "Sửa Giá Vàng",
    icon: "nc-icon nc-single-copy-04",
    component: AddPrice,
    layout: "/editor",
  },
  {
    path: "/sheetimport",
    name: "Quản Lý Sao Kê",
    icon: "nc-icon nc-paper-2",
    component: SheetImport,
    layout: "/editor",
  },
  {
    path: "/adddebt",
    name: "Quản Lý Nợ",
    icon: "nc-icon nc-ruler-pencil",
    component: AddDebt,
    layout: "/editor",
  },
  {
    path: "/repay",
    name: "Trả Nợ",
    icon: "nc-icon nc-money-coins",
    component: AddDebt,
    layout: "/editor",
  },
];

export default dashboardRoutes;
