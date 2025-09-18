import "server-only";
import { NextResponse } from "next/server";
import { z } from "zod";
import { readState, writeState, clearState} from "@/lib/session";

const PatchSchema = z.object({
  step: z.coerce.number().int().min(1).max(10),
  data: z.record(z.string(), z.any()).default({}),
});

export async function PATCH(req: Request) {
  try {
    const { step, data } = PatchSchema.parse(await req.json());
    const prev = (await readState<Record<string, unknown>>()) ?? {};
    const merged = { ...prev, ...data, _lastStep: step }; // _lastStep juste indicatif
    await writeState(merged, { ttlMinutes: 60 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "INVALID_INPUT" },
      { status: 422 }
    );
  }
  
}

export async function DELETE() {
  await clearState();
  return NextResponse.json({ ok: true });
}