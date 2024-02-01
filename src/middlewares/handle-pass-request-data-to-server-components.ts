import { NextResponse } from "next/server";
import { type MiddlewareFunction } from "./utils.chain";

export const handlePassRequestDataToServerComponents: MiddlewareFunction = async (request, next) => {
  console.log({
    what: "middleware - handlePassRequestDataToServerComponents",
  });

  const newRequestHeaders = new Headers(request.headers);
  newRequestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({
    request: {
      headers: newRequestHeaders,
    }
  });
};