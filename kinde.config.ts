import { Config } from "@kinde-oss/kinde-auth-nextjs/types"

export const config: Config = {
  authDomain: process.env.KINDE_ISSUER_URL!,
  clientId: process.env.KINDE_CLIENT_ID!,
  clientSecret: process.env.KINDE_CLIENT_SECRET!,
  redirectURL: process.env.KINDE_REDIRECT_URL!,
  logoutRedirectURL: process.env.KINDE_POST_LOGOUT_REDIRECT_URL!,
}

