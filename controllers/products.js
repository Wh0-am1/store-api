const productModel = require("../models/product");

async function getAllProductsStatic(req, res) {
  const data = await productModel.find({ price: { $gt: 100 } });
  res.status(200).json({ data, nbHits: data.length });
}
async function getAllProducts(req, res) {
  const { feature, company, name, sort, field, numericFilter } = req.query;
  const objectQuery = {};
  if (feature) objectQuery.feature = feature === "true" ? true : false;
  if (company) objectQuery.company = company;
  if (name) objectQuery.name = { $regex: name, $options: "i" };
  if (numericFilter) {
    const numericFieldMap = {
      "<": "$lt",
      ">": "$gt",
      "<=": "$lte",
      ">=": "$gte",
      "=": "$eq",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;

    let filter = numericFilter.replace(
      regEx,
      (match) => `-${numericFieldMap[match]}-`
    );

    const opn = ["price", "rating"];
    console.log(filter);

    filter = filter.split(",").forEach((item) => {
      const [option, operator, value] = item.split("-");
      if (opn.includes(option)) {
        objectQuery[option] = { [operator]: Number(value) };
      }
    });
  }
  let data = productModel.find(objectQuery);

  if (field) {
    const fieldList = field.split(",").join(" ");
    data.select(fieldList);
  }
  if (sort) {
    const sortList = sort.split(",").join(" ");
    data = data.sort(sortList);
  } else data.sort("createdAt");

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  data = data.limit(limit).skip(skip);
  const result = await data;
  res.status(200).json({ result, nbHits: result.length });
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
