// src/app/api/test/route.js

import { connectDB } from "@/services/db";

export async function GET() {
  try {
    await connectDB();

    return Response.json({
      success: true,
      message: "Database connected",
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}