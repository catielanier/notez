const { model: Filter } = require("./filterModel");

exports.createFilter = async filterData => {
  try {
    const filter = new Filter(filterData);
    return await filter.save();
  } catch (e) {
    throw e;
  }
};

exports.getAllGameFilters = async () => {
  try {
    const filters = await Filter.find({
      playerFilter: false
    });
    if (filters) {
      return filters;
    }
  } catch (e) {
    throw e;
  }
};

exports.getAllPlayerFilters = async () => {
  try {
    const filters = await Filter.find({
      playerFilter: true
    });
    if (filters) {
      return filters;
    }
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
