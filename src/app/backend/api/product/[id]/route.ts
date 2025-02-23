import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({
    id: params.id,
    name: "Smartphone X23",
    price: 699.99,
    description:
      "The latest flagship smartphone with a stunning display and advanced camera features.",
    category: "Electronics",
    brand: "Brand A",
    stock: 50,
  });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        NextResponse.json({
          status: 200,
          data: body,
          message: "Product updated successfully",
        })
      );
    }, 5000);
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({
    status: 200,
    message: "Product deleted successfully",
  });
}
