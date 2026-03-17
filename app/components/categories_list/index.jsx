import { FaPlus } from "react-icons/fa";
import CommonButton from "../common/button";
import SideBar from "../dashboard/sidebar";
import SearchField from "../common/search";

const CategoriesListComp = () => {
    return <div className="grid grid-cols-6 gap-4 dark:bg-black overflow-hidden">
        <SideBar />
        <div className="bg-white col-span-5 dark:bg-black p-10">
            <div className="flex items-center justify-between">
                <CommonButton
                    label="Add Category"
                    icon={<FaPlus />}
                />
                <SearchField />
            </div>
           
        </div>
    </div>
}
export default CategoriesListComp;