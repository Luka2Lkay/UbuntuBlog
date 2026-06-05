
export const errorMessages = {
  noToken: "No token found!",
  apiError: (process: string, entity: string) =>
    `Failed to ${process} ${entity}`,
};
