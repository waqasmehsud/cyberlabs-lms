import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(
    _req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const course = await prisma.course.findUnique({ where: { slug } });
    if (!course) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    await prisma.enrollment.upsert({
        where: { userId_courseId: { userId: session.userId, courseId: course.id } },
        update: {},
        create: { userId: session.userId, courseId: course.id },
    });

    return NextResponse.json({ enrolled: true });
}
