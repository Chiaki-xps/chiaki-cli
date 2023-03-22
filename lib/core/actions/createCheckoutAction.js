const { readJson } = require('../../utils/readJson');

const createCheckoutAction = async () => {
  const { jsonObj } = await readJson();
  console.table(jsonObj);
};

module.exports = {
  createCheckoutAction,
};

// 后续优化：readline逐行读取和显示
