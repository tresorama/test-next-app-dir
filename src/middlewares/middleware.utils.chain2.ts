import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export type NextHandler = () => NextResponse;

export type MiddlewareFunction = (
  request: NextRequest,
  next: NextHandler,
  event: NextFetchEvent,
) => NextResponse | Promise<NextResponse>;

export function composeMiddlewares(...handlers: MiddlewareFunction[]) {
  const validMiddlewareFunctions = handlers
    .filter(handler => typeof handler === 'function')
    .reverse();

  return function (request: NextRequest, event: NextFetchEvent) {
    debugger;
    const next = async (index: number = 0): Promise<NextResponse> => {
      const current = validMiddlewareFunctions[index];
      if (!current) return NextResponse.next();

      const resolvedNext = (await next(index + 1)) as NextResponse;

      return current(request, () => resolvedNext, event);
    };

    return next();
  };
}
