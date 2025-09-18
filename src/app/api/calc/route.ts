import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { readState, clearState } from "@/lib/session";
import { FinalInputSchema } from "./contracts";
import { compute } from "@kaeli1834/financabilite-engine";

export async function POST(request: NextRequest) {
  const cookieConsent = request.headers.get("X-Cookie-Consent");
  const useCookies = cookieConsent === "accepted";
  
  let inputData: Record<string, unknown>;
  
  if (useCookies) {
    // Mode avec cookies : lecture depuis la session
    const state = await readState<Record<string, unknown>>();
    if (!state) {
      return NextResponse.json(
        { ok: false, error: "SESSION_EXPIRED" },
        { status: 400 }
      );
    }
    inputData = state;
  } else {
    // Mode sans cookies : données dans le body de la requête
    try {
      inputData = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "INVALID_JSON" },
        { status: 400 }
      );
    }
  }

  const parsed = FinalInputSchema.safeParse(inputData);
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

  // Clean cookie if used
  if (useCookies) {
    await clearState();
  }

  return NextResponse.json({ ok: true, result });
}
