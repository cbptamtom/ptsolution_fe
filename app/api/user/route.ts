import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email, password, username } = body;
		// check if email already exists
		const existingUserByEmail = await db.user.findUnique({
			where: { email: email },
		});
		if (existingUserByEmail) {
			return NextResponse.json({ user: null, message: "Email already exists" }, { status: 509 });
		}
		// check if username already exists
		const existingUserByUserName = await db.user.findUnique({
			where: { username: username },
		});
		if (existingUserByUserName) {
			return NextResponse.json({ user: null, message: "Username already exists" }, { status: 509 });
		}
		const hashedPassword = bcrypt.hashSync(password, 10);
		const newUser = await db.user.create({
			data: {
				email,
				username,
				password: hashedPassword,
			},
		});
		return NextResponse.json({ user: newUser, message: "User created successfully" }, { status: 201 });
	} catch (error) {}
}
