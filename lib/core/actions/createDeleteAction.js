const inquirer = require('inquirer');
const { readJson } = require('../../utils/readJson');
const chalk = require('chalk');
const fs = require('fs');

const createDeleteAction = async (projectName = null) => {
  const { jsonObj, jsonPath } = await readJson();

  if (!projectName) {
    const yarnOptions = await inquirer.prompt([
      {
        type: 'list',
        name: 'deleteName',
        message: 'Choosing a framework to delete',
        choices: Object.keys(jsonObj),
      },
    ]);

    delete jsonObj[yarnOptions.deleteName];
  } else {
    if (!jsonObj?.[projectName]) {
      console.log(chalk.red(`${projectName}已经存在`));
      return;
    }
    delete jsonObj[projectName]
  }

  const data = JSON.stringify(jsonObj);
  await fs.writeFileSync(jsonPath, data);
  console.log(chalk.green('删除成功'));
  console.table(jsonObj);
  return;
};

module.exports = {
  createDeleteAction,
};
