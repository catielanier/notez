import {model as Filter} from "./filterModel";

export const createFilter = async (filterData) => {
	try {
		const filter = new Filter(filterData);
		return await filter.save();
	} catch (e) {
		throw e;
	}
};

export const getAllGameFilters = async () => {
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

export const getAllPlayerFilters = async () => {
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

export const getAllFilters = async () => {
	try {
		const filters = await Filter.find({});
		if (filters) {
			return filters;
		}
	} catch (e) {
		throw e;
	}
};

export const updateFilter = async (
	id,
	name,
	name_ja,
	name_ko,
	name_cn,
	name_tw,
	name_hk
) => {
	try {
		return await Filter.findByIdAndUpdate(
			{_id: id},
			{
				$set: {
					name,
					name_ja,
					name_ko,
					"name_zh-cn": name_cn,
					"name_zh-tw": name_tw,
					"name_zh-hk": name_hk
				}
			}
		);
	} catch (e) {
		throw e;
	}
};
