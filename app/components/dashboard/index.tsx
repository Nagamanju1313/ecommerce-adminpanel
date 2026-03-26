import { useEffect, useState } from "react"
import SideBar from "./sidebar"
import { GET_DASHBOARD } from "@/app/url/apiendpoints"

type DashboardProps = {
    pageName: string
}
const Dashboard = ({ pageName }: DashboardProps) => {
    const [state, setState] = useState<{}[][]>([]);

    useEffect(() => {
        (async () => {
            interface Resp {
                status: string,
                data: {}[][],
                message: string
            }
            let response = await fetch(GET_DASHBOARD);
            let res: Resp = await response.json()

            if (res.status === 'SUCCESS') {
                setState(res.data)
            } else {
                setState([])
            }

        })()
    }, []);
    console.log(state)
    return <div className="grid grid-cols-6 gap-4 dark:bg-black overflow-hidden">
        <SideBar pageName={pageName} />
        <div className="bg-white col-span-5 dark:bg-black p-10">
            <h1>Welcome {state?.[0]?.[0]?.first_name + " " + state?.[0]?.[0]?.last_name}</h1>
            <small>EmailId: {state?.[0]?.[0]?.email_id}</small>
            <div className="flex my-5 gap-5">
                <div className="w-1/3 theme-box-shadow p-5">
                    <h3 className="mb-5">Total Users</h3>
                    <p>{state?.[1]?.[0]?.userCount}</p>
                </div>
                <div className="w-1/3 theme-box-shadow p-5">
                    <h3 className="mb-5">Total Products</h3>
                    <p>{state?.[2]?.[0]?.categoriesCount}</p>
                </div>
                <div className="w-1/3 theme-box-shadow p-5">
                    <h3 className="mb-5">Total Categories</h3>
                    <p>{state?.[2]?.[0]?.categoriesCount}</p>
                </div>
            </div>
        </div>
    </div>
}

export default Dashboard