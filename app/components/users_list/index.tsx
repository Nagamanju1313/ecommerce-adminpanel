import { userData } from "@/app/protected";
import SideBar from "../dashboard/sidebar";
import { useEffect, useState } from "react";
import { GET_PRODUCTLIST } from "@/app/url/apiendpoints";
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import CommonButton from "../common/button";
import SearchField from "../common/search";
import Modal from "../common/modal";
import ProductCard from "./productcard";

type ProductListProps = {
    pageName: string
}
const UserListComp = ({ pageName }: ProductListProps) => {
    type ProductList = {
        status: string,
        data: any[],
        message: string
    }
    const userDetails = userData();
    let userId = userDetails.id;
    const [data, setData] = useState<any[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false)

    const getProductList = async (userId: number): Promise<ProductList> => {
        let response = await fetch(GET_PRODUCTLIST, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId
            })
        })
        return await response.json();
    };

    useEffect(() => {
        (async () => {
            let data = await getProductList(userId);
            if (data?.status === 'SUCCESS') {
                setData(data?.data[0])
            } else {
                setData([])
            }
        })()

    }, [])

    const handleModal = ()=>{
        setShowModal(!showModal)
    }
    return <div className="grid grid-cols-6 gap-4 dark:bg-black overflow-hidden">
        <SideBar pageName={pageName} />
        <div className="bg-white col-span-5 dark:bg-black p-10">
            <div className="flex items-center justify-between">
                <CommonButton
                    label="Add User"
                    icon={<FaPlus />}
                    btnFnc={handleModal}
                />
                <SearchField />
            </div>
            
        </div>
    </div>
}
export default UserListComp;