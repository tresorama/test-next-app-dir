// NOTE:
// this file expose 2 Next.js `Route Handlers`, 
// one for `GET` and one for `POST`
// These `Route Handlers` are used to:
//   - serve the default `next-auth` login page

// This means that you "need" this file only 
// if you use the default `next-auth` login page.
// If you use the custom one you can delete it

import { handlers } from "@/auth/auth.config";

export const { GET, POST } = handlers;