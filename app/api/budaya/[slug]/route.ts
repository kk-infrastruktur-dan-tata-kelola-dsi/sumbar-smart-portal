// API route for budaya item detail by slug
import { NextRequest, NextResponse } from "next/server";

import { getBudayaItemBySlug } from "@/utils/budaya-queries";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const item = await getBudayaItemBySlug(slug);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error in budaya detail API:", error);

    return NextResponse.json(
      { error: "Failed to fetch budaya item" },
      { status: 500 },
    );
  }
}
