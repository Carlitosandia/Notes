import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashBoard from "./views/DashBoard";
import CreateNotes from "./views/notes/CreateNotes";
import EditNotes from "./views/notes/EditNotes";
import CreateCategories from "./views/categories/CreateCategories";
import ViewNote from "./views/notes/ViewNote";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./views/auth/Login";
import PrivateRoute from "./components/PrivateRoute";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<DashBoard />} index />
                        <Route path="/notes/create" element={<CreateNotes />} />
                        <Route path="/notes/:noteid/edit" element={<EditNotes />} />
                        <Route path="/category/create" element={<CreateCategories />} />
                        <Route path="/notes/:noteid" element={<ViewNote />} />
                    </Route>
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}