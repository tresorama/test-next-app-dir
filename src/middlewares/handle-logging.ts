import { MiddlewareFunction } from "./middleware.utils.chain";

export const handleLogging: MiddlewareFunction = (request) => {
  console.log("");
  console.log("");
  console.log({
    what: "middleware - handleLogging",
    method: request.method,
    url: `${request.nextUrl.pathname}${request.nextUrl.search}`,
    pathname: request.nextUrl.pathname,
    searchParams: Object.fromEntries(request.nextUrl.searchParams.entries()),
  });

  return;
};