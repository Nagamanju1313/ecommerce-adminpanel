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

type OrderListProps = {
    pageName: string
}
const OrderListComp = ({ pageName }: OrderListProps) => {
    
    return <div className="grid grid-cols-6 gap-4 dark:bg-black overflow-hidden">
        <SideBar pageName={pageName} />
        <div className="bg-white col-span-5 dark:bg-black p-10">
            <div className="flex items-center justify-between">
                
                <SearchField />
            </div>
            
        </div>
    </div>
}
export default OrderListComp;