import { Outlet } from "react-router";
import Header from "./components/Header";

export const Layout = () => {
  return (
    <div className="bg-slate-200">
      <Header />

      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};
