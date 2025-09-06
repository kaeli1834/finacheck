import { NextResponse } from "next/server";
import { z } from "zod";
import { compute } from "@kaeli1834/financabilite-engine";

// Schéma de validation (Zod)
const InputSchema = z.object({
  creditsAcquis: z.number().int().min(0).max(300),
  creditsEchecs: z.number().int().min(0).max(300),
  anneeInscription: z.number().int().min(2000).max(2100),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = InputSchema.parse(body);

    // TODO : update compute function to return detailed errors
    const result = compute(input);

    return NextResponse.json({ ok: true, result });
  } catch (e: Error | unknown) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 400 }
    );
  }
}
