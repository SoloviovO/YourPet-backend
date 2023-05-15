const { NoticesModel } = require("../../database/models/notices.model");

const { getCategorySchema } =
  require("../../schemas/notice.schema").noticeSchemas;

const getCategory = async (req, res) => {
  const { page, limit, category } = req.query;

  const skip = (page - 1) * limit;

  const { error } = getCategorySchema.validate({ category });
  if (error) {
    return res.status(400).json({
      error:
        'Invalid category, please select one of: ["sell", "lost-found", "for-free"]',
    });
  }

  const noticesAll = await NoticesModel.find({
    category: category ? category : "sell",
  });
  const notices = await NoticesModel.find({
    category: category ? category : "sell",
  })
    .skip(skip)
    .limit(limit);

  res.json({ notices, total: noticesAll.length });
};

module.exports = {
  getCategory,
};
