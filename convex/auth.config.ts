import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: "https://proud-kiwi-77.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
