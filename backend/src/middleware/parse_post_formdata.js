const parsePostFormData = (req, res, next) => {
  try {
    if (req.body.tags) {
      req.body.tags = JSON.parse(req.body.tags);
    }

    if (req.body.seo) {
      req.body.seo = JSON.parse(req.body.seo);
    }

    if (req.body.published !== undefined) {
      req.body.published = req.body.published === "true";
    }

    if (req.body.featured !== undefined) {
      req.body.featured = req.body.featured === "true";
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Invalid form data",
    });
  }
};

module.exports = { parsePostFormData };
