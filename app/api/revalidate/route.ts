import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  const authorized = await verifyAdminRequest(request);
  if (!authorized) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  const { paths } = await request.json();
  if (!Array.isArray(paths)) {
    return NextResponse.json({ error: "Chybí seznam cest." }, { status: 400 });
  }

  for (const path of paths) {
    if (typeof path !== "string") continue;
    revalidatePath(path, path === "/" ? "layout" : "page");
  }

  return NextResponse.json({ ok: true });
}
