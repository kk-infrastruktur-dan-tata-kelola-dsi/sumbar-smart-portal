// API route for kabupatens
import { NextResponse } from "next/server";

import { getKabupatens } from "@/utils/budaya-queries";

export const dynamic = "force-dynamic"; // Ensure fresh data per request
export const revalidate = 0; // No caching for debugging

export async function GET() {
  try {
    const kabupatens = await getKabupatens(true); // Include item counts

    // Log for debugging
    console.log(
      "[API /budaya/kabupatens] Returning",
      kabupatens.length,
      "kabupatens",
    );

    return NextResponse.json(kabupatens, {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("[API /budaya/kabupatens] Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch kabupatens",
        details: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 },
    );
  }
}
