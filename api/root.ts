import { Nest } from "owasp-nest";

export const nest = new Nest({
    apiKey: process.env.NEXT_SERVER_OWASP_NEST_API_KEY || "",
});

export const apiUrl = process.env.NEXT_SERVER_API_URL
