import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { lessonId } = await req.json();
    if (!lessonId) {
        return NextResponse.json({ error: "lessonId is required" }, { status: 400 });
    }

    const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
    if (!lesson) {
        return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    await prisma.progress.upsert({
        where: { userId_lessonId: { userId: session.userId, lessonId } },
        update: {},
        create: { userId: session.userId, lessonId },
    });

    return NextResponse.json({ completed: true });
}
