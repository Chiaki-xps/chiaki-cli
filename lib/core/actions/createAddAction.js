const fs = require('fs');
const { readJson } = require('../../utils/readJson');
const chalk = require('chalk');

const createAddAction = async (project, url) => {
  const { jsonPath, jsonObj } = await readJson();
  let urlOption;

  // 校验URL
  try {
    urlOption = new URL(url);
  } catch (err) {
    return;
  }

  if (jsonObj?.[project]) {
    console.log(chalk.red(`${project}已经存在`));
    return;
  } else {
    jsonObj[project] = urlOption.protocol === 'https:' ? 'direct:' + url : url;
    const data = JSON.stringify(jsonObj);
    await fs.writeFileSync(jsonPath, data);
    console.log(chalk.green('添加成功'));
  }
};

module.exports = {
  createAddAction,
};
