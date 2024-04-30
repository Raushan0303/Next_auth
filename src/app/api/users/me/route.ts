import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDatafromToken";

connect();

export async function POST(request: NextRequest) {
    try {
        // Extract data from token
        const userId = await getDataFromToken(request);
        console.log("User ID from token:", userId);

        // Find user by ID
        const user = await User.findOne({ _id: userId }).select("-password");

        // Check if user exists
        if (!user) {
            console.log("User not found");
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        console.log("User found:", user);

        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error: any) {
        console.error("Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
