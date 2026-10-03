import { NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
    const navItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "▦"
        },
        {
            name: "Leads",
            path: "/leads",
            icon: "♙"
        },
        {
            name: "Inbox",
            path: "/inbox",
            icon: "✉"
        },
        {
            name: "Follow-ups",
            path: "/follow-ups",
            icon: "◷"
        },
        {
            name: "Settings",
            path: "/settings",
            icon: "⚙"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">

            {/* Sidebar */}

            <aside className="w-64 bg-slate-950 text-white flex flex-col">

                {/* Logo */}

                <div className="h-20 flex items-center px-6 border-b border-slate-800">

                    <div>
                        <h1 className="text-lg font-bold">
                            AI Business Agent
                        </h1>

                        <p className="text-xs text-slate-500 mt-1">
                            Sales Automation
                        </p>
                    </div>

                </div>

                {/* Navigation */}

                <nav className="flex-1 px-3 py-6">

                    <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Workspace
                    </p>

                    <div className="space-y-1">

                        {navItems.map((item) => (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                                        isActive
                                            ? "bg-blue-600 text-white"
                                            : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                    }`
                                }
                            >

                                <span className="w-5 text-center">
                                    {item.icon}
                                </span>

                                <span>
                                    {item.name}
                                </span>

                            </NavLink>

                        ))}

                    </div>

                </nav>

                {/* AI Status */}

                <div className="p-4 border-t border-slate-800">

                    <div className="rounded-lg bg-slate-900 p-3">

                        <div className="flex items-center gap-2">

                            <span className="w-2 h-2 rounded-full bg-green-400"></span>

                            <span className="text-sm font-medium">
                                AI Agent Online
                            </span>

                        </div>

                        <p className="text-xs text-slate-500 mt-1">
                            Automation is running
                        </p>

                    </div>

                </div>

            </aside>

            {/* Main Area */}

            <div className="flex-1 flex flex-col min-w-0">

                {/* Header */}

                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

                    <div>
                        <p className="text-sm text-slate-500">
                            Business Automation
                        </p>

                        <h2 className="text-lg font-semibold text-slate-900">
                            AI Business Agent
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">

                        <button className="relative p-2 text-slate-500 hover:text-slate-900">

                            <span className="text-xl">
                                🔔
                            </span>

                            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>

                        </button>

                        <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                                H
                            </div>

                            <div className="hidden sm:block">
                                <p className="text-sm font-medium text-slate-900">
                                    Business Admin
                                </p>

                                <p className="text-xs text-slate-500">
                                    Administrator
                                </p>
                            </div>

                        </div>

                    </div>

                </header>

                {/* Page */}

                <main className="flex-1 p-8 overflow-auto">

                    <Outlet />

                </main>

            </div>

        </div>
    );
};

export default MainLayout;
