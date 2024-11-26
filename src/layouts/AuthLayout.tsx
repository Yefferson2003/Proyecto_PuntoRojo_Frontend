import LogoBgWhite from "@/components/logos/LogoBgWhite"
import { Link, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

function AuthLayout() {
    return (
        <section className="min-h-screen py-5 bg-slate-300 lg:py-10">
            <div className="py-5 mx-auto md:w-[450px] bg-white rounded-lg shadow-lg px-5 w-full">
                
                <div className="w-[200px] mx-auto pb-5">
                    <Link to={'/'}>
                        <LogoBgWhite/>
                    </Link>
                </div>
                <Outlet/>
            </div>
            <ToastContainer 
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                autoClose={10000}
            />
        </section>
    )
}

export default AuthLayout