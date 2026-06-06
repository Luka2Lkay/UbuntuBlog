export const errorMessages = {
  noToken: "No token found!",
  apiError: (process: string, entity = "data"): string =>
    `Failed to ${process} ${entity}`,
};
