import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";

export default function Header() {
    return (
        <div>
            <header className="bg-gray-800 py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-64">
                        <Logo />
                    </div>
                    <NavMenu />
                </div>
            </header>
        </div>
    )
}