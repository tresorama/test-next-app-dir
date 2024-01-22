import { NextRequest } from "next/server";

export const handleLogging = (request: NextRequest) => {
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