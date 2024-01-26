import { composeMiddleware } from "@/middlewares/middleware.utils.chain";
import { handleLogging } from "@/middlewares/handle-logging";
import { handlePassRequestDataToServerComponents } from "./middlewares/handle-pass-request-data-to-server-components";
import { handleInternalization } from "@/i18n/server/i18n.middleware";
import { auth as handleAuth } from "@/auth/auth.config";

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
  // @ts-expect-error
  async (req, next, evt) => {

    // @ts-expect-error
    const response = await handleAuth(req, evt);
    // wrong types 
    if (response) return response;
    return next();
  }
]);