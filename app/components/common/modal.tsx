import { MdOutlineClose } from "react-icons/md";
import { ModalBodyData } from "../product_list/modalbodydata";
interface ModalProps{
    setShow:()=>void,
    heading:string,
    
}

const Modal = ({setShow, heading}:ModalProps)=>{
    return <div className="overlay fixed left-0 right-0 top-0 bottom-0 w-full h-full z-50
    bg-black/80">
        <div className="container">
            <div className="flex items-center justify-center">
                <div className="w-1/2 h-full my-20">
                    <div className="modal-body p-5 bg-white h-full">
                        <div className="flex items-center justify-between p-[10px] mb-2">
                            <h3>{heading}</h3>
                            <button className="cursor-pointer text-2xl"
                            onClick={()=>setShow(false)}
                            ><MdOutlineClose /></button>
                        </div>

                        <ModalBodyData/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Modal;