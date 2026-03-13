import SideBar from "./sidebar"

const Dashboard = ()=>{
    return <div className="grid grid-cols-6 gap-4 dark:bg-black">
        <SideBar/>
        <div className="bg-white col-span-5 dark:bg-black">Dashboard</div>
    </div>
}

export default Dashboard