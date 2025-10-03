import Navbar from "@/modules/layout/components/navbar"

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <Navbar />
            {children}
        </main>
    )
}

export default HomeLayout