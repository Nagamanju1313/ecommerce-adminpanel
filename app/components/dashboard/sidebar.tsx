import Link from "next/link"

type SidebarProps = {
    pageName:string
}
const SideBar = ({pageName}:SidebarProps) => {

    return <div className="h-[87vh] bg-blue-50 w-full
    ">
        <ul className="w-full h-[100%] mt-10">
            <li className="w-full">
                <Link href="/dashboard"
                className="w-full p-2 px-5 cursor-pointer block hover:bg-sky-500 hover:text-white text-left">Dashboard</Link>
            </li>
            <li className="w-full">
                <Link href="/product-list" className="w-full p-2 px-5 cursor-pointer block hover:bg-sky-500 hover:text-white text-left">Product List</Link>
            </li>
            <li className="w-full">
                <Link href="/categories-list" className="w-full p-2 px-5 cursor-pointer block hover:bg-sky-500 hover:text-white text-left">Categories List</Link>
            </li>
            <li className="w-full">
                <Link href="/orders-list" className="w-full p-2 px-5 cursor-pointer block hover:bg-sky-500 hover:text-white text-left">Orders List</Link>
            </li>
            <li className="w-full">
                <Link href="/users-list" className="w-full p-2 px-5 cursor-pointer block hover:bg-sky-500 hover:text-white text-left">Users List</Link>
            </li>
        </ul>
    </div>
}
export default SideBar