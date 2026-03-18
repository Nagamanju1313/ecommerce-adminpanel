import SideBar from "./sidebar"

type DashboardProps = {
    pageName:string
}
const Dashboard = ({pageName}:DashboardProps)=>{
    return <div className="grid grid-cols-6 gap-4 dark:bg-black overflow-hidden">
        <SideBar pageName={pageName}/>
        <div className="bg-white col-span-5 dark:bg-black p-10">
<h1>Welcome Nagaraj</h1>

        </div>
    </div>
}

export default Dashboard