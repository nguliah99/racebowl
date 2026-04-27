import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => ({
  locale: "id",
  messages: (await import("../messages/id.json")).default,
}));
