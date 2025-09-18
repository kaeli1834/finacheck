// src/lib/session.ts
import "server-only";
import { cookies } from "next/headers";
import { EncryptJWT, jwtDecrypt, JWTPayload } from "jose";

const COOKIE_NAME = "calc"; // nom du cookie
const ALG = "dir";          // chiffrement symétrique
const ENC = "A256GCM";      // AES-256-GCM

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET manquant");
  return new TextEncoder().encode(secret);
}

type AnyRecord = Record<string, unknown>;

export async function readState<T extends AnyRecord = AnyRecord>(
  name = COOKIE_NAME
): Promise<T | null> {
  const token = (await cookies()).get(name)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtDecrypt(token, getSecret(), {
      clockTolerance: "2s",
    });
    return payload as T;
  } catch {
    return null; // expiré / invalide
  }
}

export async function writeState<T extends AnyRecord = AnyRecord>(
  data: T,
  options?: { name?: string; ttlMinutes?: number }
) {
  const name = options?.name ?? COOKIE_NAME;
  const ttl = options?.ttlMinutes ?? 60;
  const secret = getSecret();

  const token = await new EncryptJWT(data as JWTPayload)
    .setProtectedHeader({ alg: ALG, enc: ENC })
    .setIssuedAt()
    .setExpirationTime(`${ttl}m`)
    .encrypt(secret);

  (await cookies()).set(name, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: ttl * 60,
  });
}

export async function clearState(name = COOKIE_NAME) {
  (await cookies()).set(name, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
