import { appRouter, createTRPCContext } from "@racebowl/api";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: () => createTRPCContext({ headers: request.headers }),
  });

export { handler as GET, handler as POST };
