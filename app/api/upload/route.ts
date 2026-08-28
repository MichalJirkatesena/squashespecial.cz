import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  const authorized = await verifyAdminRequest(request);
  if (!authorized) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = formData.get("folder");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Chybí soubor." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Povoleny jsou jen obrázky." }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "Soubor je příliš velký (max 10 MB)." }, { status: 400 });
  }

  const safeFolder = typeof folder === "string" && folder ? folder.replace(/[^a-zA-Z0-9/_-]/g, "") : "misc";
  const path = `uploads/${safeFolder}/${Date.now()}-${file.name}`;

  const blob = await put(path, file, { access: "public" });

  return NextResponse.json({ url: blob.url });
}
