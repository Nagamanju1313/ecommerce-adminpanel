import { userData } from "@/app/protected";
import SideBar from "../dashboard/sidebar";
import { useEffect, useState } from "react";
import { GET_PRODUCTLIST } from "@/app/url/apiendpoints";
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import CommonButton from "../common/button";
import SearchField from "../common/search";
import Modal from "../common/modal";

type ProductListProps = {
    pageName: string
}
const ProductListComp = ({ pageName }: ProductListProps) => {
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
                setData(data?.data)
            } else {
                setData([])
            }
        })()

    }, [])
    return <div className="grid grid-cols-6 gap-4 dark:bg-black overflow-hidden">
        <SideBar pageName={pageName} />
        <div className="bg-white col-span-5 dark:bg-black p-10">
            <div className="flex items-center justify-between">
                <CommonButton
                    label="Add Product"
                    icon={<FaPlus />}
                />
                <SearchField />
            </div>
            {
                data.length > 0 ?
                    data :
                    <div className="">
                        <h3>Data Not Found</h3>
                    </div>
            }
            {
                showModal &&
                <Modal setShow={setShowModal}/>
            }
        </div>
    </div>
}
export default ProductListComp;