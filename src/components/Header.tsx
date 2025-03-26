import { Link, useLocation } from "react-router";

const Header = () => {
  const { pathname } = useLocation();

  const routes = [
    {
      pathname: "/",
      title: "Home",
    },
    {
      pathname: "/history",
      title: "History",
    },
  ];

  return (
    <header>
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">
          <Link to="/">GitHub Search</Link>
        </h1>
        <div className="space-x-4">
          {routes.map((route, i) => (
            <Link
              key={i}
              to={route.pathname}
              className={`text-sm font-medium ${
                pathname === route.pathname
                  ? "text-blue-600 border-b-2"
                  : "text-slate-600 hover:text-blue-600"
              }`}
            >
              {route.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
