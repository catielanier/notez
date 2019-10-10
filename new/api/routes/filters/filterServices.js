const { model: Filter } = require("./filterModel");

exports.createFilter = async filterData => {
  try {
    const filter = new Filter(filterData);
    return await filter.save();
  } catch (e) {
    throw e;
  }
};

exports.getAllFilters = async () => {
  try {
    const filters = await Filter.find({});
    if (filters) {
      return filters;
    }
  } catch (e) {
    throw e;
  }
};