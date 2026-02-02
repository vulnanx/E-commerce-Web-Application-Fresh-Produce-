import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
    console.log("POST RAN")
    try {
        const body = await req.json();
        const productData = body.formData;
        await Product.create(productData);
        console.log("Product created")

        return NextResponse.json({message: "Product created"}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
}


// export async function GET() {
//     try {
//         const products = await Product.find();
//         console.log("Product get")

//         return NextResponse.json({tickets}, {status: 200})
//     } catch (error) {
//         return NextResponse.json({message: "Error", error}, {status: 500});
//     }
// }

export async function GET() {
    try {
        const products = await Product.find();
        console.log("Product get")

        return NextResponse.json({products}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
}