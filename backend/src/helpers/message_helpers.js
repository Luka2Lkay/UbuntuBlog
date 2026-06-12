const errorMessages = {
  notFound: (item) => `${item} is not found`,
  missingId: (item) => `${item} id is required`,
  exists: (item) => `${item} already exists`,
  notAuthorized: "Unauthorized!",
};

module.exports = { errorMessages };
