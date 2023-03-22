const { readJson } = require('../../utils/readJson');

const createCheckoutAction = async () => {
  const jsonData = await readJson();
  console.log(jsonData);
};

module.exports = {
  createCheckoutAction,
};

// 后续优化：readline逐行读取和显示
