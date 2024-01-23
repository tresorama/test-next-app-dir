export const removePrefix = (str: string, prefix: string[]) => prefix.reduce((acc, curr) => acc.replace(curr, ""), str);
