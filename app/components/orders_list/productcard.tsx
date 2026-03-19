import Image from "next/image";
import Link from "next/link";

type CardProps={
    name:string
    desc:string
    price:number
    sellingPrice:number
    stockQuantity:number
    category:string
}
const ProductCard = ({name, desc, price, sellingPrice, stockQuantity, category}:CardProps)=>{
    return <div >
        <div className="img-col">
            <Image
                src="https://placehold.co/600x400.png"
                width={200}
                height={200}
                style={{width:"100%", marginBottom:"15px"}}
                alt="Picture of the product"
            />
        </div>
        <h4>ProductName</h4>
        <p>description</p>
        <p>price</p>
        <p>Selling price</p>
        <p>Stock quantity</p>
        <p>category</p>
        <p>Variant</p>
        <div className="flex items-center justify-between">
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </div>
}
export default ProductCard;