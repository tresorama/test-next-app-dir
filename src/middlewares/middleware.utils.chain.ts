import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

export type MiddlewareFunction = (
  request: NextRequest,
  evt: NextFetchEvent,
) =>
  | NextResponse
  | Response
  | Promise<NextResponse>
  | Promise<NextResponse | void>
  | Promise<void>
  | void;

/**
 * - Registers as many middlwares as needed.
 *
 * - Middlewares are invoked in the order they were registerd.
 *
 * - The first middleware to return the instance of NextResponse breaks the chain.
 *
 * - As in the next docs, middlewares are invoked for every request including next
 *   requests to fetch static assets and the sorts.
 * 
 * @example
 * 
 * // in middleware.ts
 * 
 * export default composeMiddlewares(
 *   (request: NextRequest) => {
 *     console.log("");
 *     console.log("");
 *     console.log({ what: "middleware - handleLogging", pathname: request.nextUrl.pathname });
 *     return;
 *   },
 *   handleInternalization,
 * );
 */
export function composeMiddlewares(...middlwares: MiddlewareFunction[]) {
  const validMiddlewares = middlwares.reduce((acc, _middleware) => {
    if (typeof _middleware === "function") {
      return [...acc, _middleware];
    }

    console.warn("Trying to register an invalid middleware: ", _middleware);

    return acc;
  }, [] as MiddlewareFunction[]);

  return async function middleware(request: NextRequest, evt: NextFetchEvent) {

    for (const _middleware of validMiddlewares) {
      const result = await _middleware(request, evt);

      if (result instanceof NextResponse) {
        return result;
      }
      if (result instanceof Response) {
        return result;
      }
    }

    const response = NextResponse.next();
    return response;
  };
}
