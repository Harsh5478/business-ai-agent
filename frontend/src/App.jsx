import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Inbox from "./pages/Inbox";
import FollowUps from "./pages/FollowUps";
import Settings from "./pages/Settings";

const App = () => {
    return (
        <BrowserRouter>

            <Routes>

                <Route element={<MainLayout />}>

                    <Route
                        path="/"
                        element={
                            <Navigate
                                to="/dashboard"
                                replace
                            />
                        }
                    />

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/leads"
                        element={<Leads />}
                    />

                    <Route
                        path="/inbox"
                        element={<Inbox />}
                    />

                    <Route
                        path="/follow-ups"
                        element={<FollowUps />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
};

export default App;