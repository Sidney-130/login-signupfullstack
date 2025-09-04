import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
    console.log();
  }
}
