import { IconType } from 'react-icons';

interface ButtonProps {
    label: string
    icon: IconType
    btnFnc: () => void
}


const CommonButton = ({ label, icon, btnFnc }: ButtonProps) => {
    return <button className="cursor-pointer flex items-center gap-2 bg-sky-600 text-white p-1.5 px-5
                    hover:bg-sky-500
                    "
        onClick={btnFnc}
    ><span>{label}</span> {icon}
    </button>
}
export default CommonButton;