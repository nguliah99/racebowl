import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export async function createTRPCContext(opts?: { headers: Headers }) {
  return {
    headers: opts?.headers,
  };
}

const t = initTRPC
  .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create({
    transformer: superjson,
  });

export const router = t.router;
export const publicProcedure = t.procedure;
