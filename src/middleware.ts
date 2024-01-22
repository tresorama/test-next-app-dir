import { composeMiddlewares } from "@/middlewares/middleware.utils.chain";
import { handleLogging } from "@/middlewares/handle-logging";
import { auth as handleAuth } from "@/auth/auth.config";
import { handleInternalization } from "@/i18n/server/i18n.middleware";

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

export default composeMiddlewares(
  handleLogging,
  handleInternalization,
  // @ts-expect-error
  handleAuth,
);