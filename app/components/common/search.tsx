import { CiSearch } from "react-icons/ci"

const SearchField = ()=>{
    return <div className="flex items-center relative"><input className="border-2 border-sky-600 text-[14px] p-1 px-2" type="text" placeholder="Search..." />
        <button className="absolute right-2 cursor-pointer"><CiSearch /></button>
    </div>
}
export default SearchField;