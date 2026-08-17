const { body } = require("express-validator");

const validatePostCreation = [
  body("title")
    .isString()
    .isLength({ min: 3, max: 300 })
    .withMessage("Title must be between 3 and 300 characters"),
  body("content").isString().withMessage("Content is required"),
  body("excerpt")
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage("Excerpt must be at most 500 characters"),
  body("category")
    .optional()
    .isString()
    .isLength({ max: 100 })
    .withMessage("Category must be at most 100 characters"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array of strings"),
  body("tags.*").isString().withMessage("Each tag must be a string"),
  body("seo").optional().isObject().withMessage("SEO must be an object"),
  body("seo.metaTitle")
    .optional()
    .isString()
    .withMessage("SEO meta title must be a string"),
  body("seo.metaDescription")
    .optional()
    .isString()
    .withMessage("SEO meta description must be a string"),
  body("seo.keywords")
    .optional()
    .isArray()
    .withMessage("SEO keywords must be an array of strings"),
  body("seo.keywords.*")
    .isString()
    .withMessage("Each SEO keyword must be a string"),
  body("published")
    .optional()
    .isBoolean()
    .withMessage("Published must be a boolean"),
];

const validateSiteCreation = [
  body("name")
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be between 3 and 100 characters"),
  body("domain")
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("Domain must be between 3 and 100 characters"),
];

module.exports = { validatePostCreation, validateSiteCreation };
