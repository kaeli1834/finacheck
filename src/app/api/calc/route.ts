import "server-only";
import { NextResponse } from "next/server";
import { readState, clearState } from "@/lib/session";
import { FinalInputSchema } from "./contracts";
import { compute } from "@kaeli1834/financabilite-engine";

export async function POST() {
  const state = await readState<Record<string, unknown>>();
  if (!state) {
    return NextResponse.json(
      { ok: false, error: "SESSION_EXPIRED" },
      { status: 400 }
    );
  }

  const parsed = FinalInputSchema.safeParse(state);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "INVALID_INPUT",
        issues: parsed.error.issues.map(i => ({
          path: i.path,
          message: i.message,
        })),
      },
      { status: 422 }
    );
  }

  // TODO: add type for compute input
  const result = compute(parsed.data as any); 

  // clean cookie
  await clearState();

  return NextResponse.json({ ok: true, result });
}
