import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "@/layouts/Header"
import Footer from "@/layouts/Footer"
export default function AppLayout() {
    return(
        <>
            <Header/>
            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
            <Outlet />
            </section>
            <Footer />
            <ToastContainer 

            />
        </>
    )
}

