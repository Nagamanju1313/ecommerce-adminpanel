import { MdOutlineClose } from "react-icons/md";
interface ModalProps{
    setShow:()=>void
}

const Modal = ({setShow}:ModalProps)=>{
    return <div className="overlay fixed left-0 right-0 top-0 bottom-0 w-full h-full z-50
    bg-black/80">
        <div className="container">
            <div className="flex items-center justify-center">
                <div className="w-1/2 h-full my-20">
                    <div className="modal-body p-10 bg-white h-full">
                        <div className="flex items-center justify-between">
                            <h3>Header</h3>
                            <button className="cursor-pointer text-2xl"
                            onClick={()=>setShow(false)}
                            ><MdOutlineClose /></button>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="w-1/2">
                                <div className="form-col">
                                    <input type="text" placeholder="Product name"/>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="form-col">
                                    <input type="text" placeholder="Category name"/>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="form-col">
                                    <input type="text" placeholder="Price"/>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="form-col">
                                    <input type="text" placeholder="Selling Price"/>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="form-col">
                                    <input type="text" placeholder="Stock quantity"/>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="form-col">
                                    <input type="text" placeholder="variant"/>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="form-col">
                                    <input type="text" placeholder="Images"/>
                                </div>
                            </div>
                             <div className="w-1/2">
                                <div className="form-col">
                                    <button>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Modal;