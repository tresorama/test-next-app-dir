import { composeMiddleware } from "@/middlewares/utils.chain";
import { handleLogging } from "@/middlewares/handle-logging";
import { handlePassRequestDataToServerComponents } from "./middlewares/handle-pass-request-data-to-server-components";
import { handleInternalization } from "@/i18n/server/i18n.middleware";
import { handleAuth } from "./auth/auth.middleware";

// TODO: migrate matcher to single midldeware instead of a global one
export const config = {
  matcher: [
    /*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

// export default handleAuth;

export default composeMiddleware([
  handleLogging,
  handlePassRequestDataToServerComponents,
  handleInternalization,
  handleAuth,
]);