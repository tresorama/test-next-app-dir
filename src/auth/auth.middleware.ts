import { MiddlewareFunction } from "@/middlewares/utils.chain";
import { auth } from "./auth.config";


// @ts-expect-error
export const handleAuth: MiddlewareFunction = async (request, next, event) => {

  // @ts-expect-error
  const response = await auth(request, event);

  // wrong types 
  if (response) return response;

  return next();
};