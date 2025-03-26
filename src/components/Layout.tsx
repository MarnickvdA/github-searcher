import { Outlet } from "react-router";
import Header from "./Header";

export const Layout = () => {
  return (
    <div className="bg-slate-200">
      <Header />

      <main className="mx-auto max-w-2xl flex flex-col gap-8 p-8">
        <Outlet />
      </main>
    </div>
  );
};
