const { NoticesModel } = require("../../database/models/notices.model");

const { getCategorySchema } =
  require("../../schemas/notice.schema").noticeSchemas;

const getCategory = async (req, res) => {
  const { category } = req.query;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  const { error } = getCategorySchema.validate({ category });
  if (error) {
    return res.status(400).json({
      error:
        'Invalid category, please select one of: ["sell", "lost/found", "in good hands"]',
    });
  }

  const notices = await NoticesModel.find({
    category: category ? category : "sell",
  })
    .skip(skip)
    .limit(limit);

  res.json(notices);
};

module.exports = {
  getCategory,
};
