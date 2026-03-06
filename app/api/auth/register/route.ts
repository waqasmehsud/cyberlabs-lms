import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword, signToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        if (password.length < 6) {
            return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "Email already in use" }, { status: 409 });
        }

        const passwordHash = await hashPassword(password);
        const user = await prisma.user.create({
            data: { name, email, passwordHash },
            select: { id: true, name: true, email: true, role: true },
        });

        const token = await signToken({ userId: user.id, email: user.email, name: user.name, role: user.role });
        await setSessionCookie(token);

        return NextResponse.json({ user }, { status: 201 });
    } catch (err) {
        console.error("[register]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
