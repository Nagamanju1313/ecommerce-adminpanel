export const ModalBodyData = () => {
    return <div className="flex flex-wrap modal-form">
        <div className="w-1/2">
            <div className="form-col">
                <input type="text" placeholder="Product name" />
            </div>
        </div>
        <div className="w-1/2">
            <div className="form-col">
                <input type="text" placeholder="Category name" />
            </div>
        </div>
        <div className="w-1/2">
            <div className="form-col">
                <input type="text" placeholder="Price" />
            </div>
        </div>
        <div className="w-1/2">
            <div className="form-col">
                <input type="text" placeholder="Selling Price" />
            </div>
        </div>
        <div className="w-1/2">
            <div className="form-col">
                <input type="text" placeholder="Stock quantity" />
            </div>
        </div>
        <div className="w-1/2">
            <div className="form-col">
                <input type="text" placeholder="variant" />
            </div>
        </div>
        <div className="w-1/2">
            <div className="form-col">
                <input type="text" placeholder="Images" />
            </div>
        </div>
        <div className="w-1/2">
            <div className="form-col">
                <button className="text-center bg-sky-600 w-full p-[5px] text-white cursor-pointer
                hover:bg-sky-800
                ">Submit</button>
            </div>
        </div>
    </div>
}