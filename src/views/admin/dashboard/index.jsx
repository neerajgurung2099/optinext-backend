import { useDocumentTitle, useScrollTop } from "@/hooks";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";
import { Boundary } from "@/components/common";
import { useDispatch, useSelector } from "react-redux";
import { getAdminAnalytics } from "@/redux/actions/adminActions";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  useDocumentTitle("Welcome | Admin Dashboard");
  useScrollTop();
  const dispatch = useDispatch();

  const { stats, monthlyUsers, monthlyRevenue } = useSelector(
    (state) => state.admin,
  );

  const isLoading = useSelector((state) => state.app.loading);

  useEffect(() => {
    dispatch(getAdminAnalytics());
  }, [dispatch]);

  if (isLoading) {
    return <h3>Loading analytics...</h3>;
  }
  return (
    <Boundary>
      <div className="admin-dashboard">
        <h2>Admin Analytics Dashboard</h2>

        {/* STAT CARDS */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <h4>Total Users</h4>
            <p>{stats.users}</p>
          </div>

          <div className="stat-card">
            <h4>Total Products</h4>
            <p>{stats.products}</p>
          </div>

          <div className="stat-card">
            <h4>Total Orders</h4>
            <p>{stats.orders}</p>
          </div>
          <div className="stat-card">
            <h4>Total Revenue</h4>
            <p>
              {new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
              }).format(stats.revenue)}
            </p>
          </div>
        </div>

        {/* LINE CHART */}
        <div className="chart-box">
          <h3>Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v) => `£${v}`} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#00C49F"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR + PIE */}
        <div className="chart-row">
          <div className="chart-box">
            <h3>User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyUsers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-box">
            <h3>Monthly Users</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyUsers}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Boundary>
  );
};

export default Dashboard;
