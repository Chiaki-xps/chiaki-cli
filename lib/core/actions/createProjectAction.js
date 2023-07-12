const { promisify } = require('util');
const download = promisify(require('download-git-repo'));

const ora = require('ora');
const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');

const { commandSpawn } = require('../../utils/terminal');
const { readJson } = require('../../utils/readJson');

const createProjectAction = async (projectName, others) => {
  const { jsonObj } = await readJson();

  const inquirerOptions = await inquirer.prompt([
    {
      type: 'list',
      name: 'useFrame',
      message: 'Choosing a framework to Use(选择下载的仓库):',
      choices: Object.keys(jsonObj),
    },
    {
      type: 'confirm',
      name: 'useNpm',
      message: 'Execute npm install(时间可能比较久...)?',
      default: false,
    },
  ]);

  const templateAddress = jsonObj[inquirerOptions.useFrame];

  const processTips = ora(
    `Downloading a ${inquirerOptions.useFrame} template...`
  );
  processTips.color = 'magenta';
  processTips.start();

  try {
    await download(templateAddress, projectName, {});
    processTips.color = 'green';
    processTips.text = `${inquirerOptions.useFrame} Download successfully, check the file`;
    processTips.succeed();
  } catch (err) {
    console.log('\n' + err);
    processTips.color = 'red';
    console.log(
      chalk.red(`
      The download failed. Refer to the error message,check network.\n 
      仓库下载失败,查看错误信息,检查网络`)
    );
    processTips.fail('Download failed(下载失败)');
    return;
  }

  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  // const yarnCommand = process.platform === 'win32' ? 'yarn.cmd' : 'yarn';

  if (inquirerOptions.useNpm) {
    try {
      // 检查仓库的package.json
      await fs.promises.access(
        `./${projectName}/package.json`,
        fs.constants.F_OK | fs.constants.W_OK
      );
      processTips.color = 'magenta';
      processTips.text = `npm install...`;
      processTips.start();
    } catch (err) {
      console.log(err);
      console.log(chalk.red('check your package.json'));
      return;
    }

    try {
      await commandSpawn(npmCommand, ['install'], { cwd: `./${projectName}` });
      processTips.color = 'green';
      processTips.succeed('install success');
    } catch (err) {
      console.log(err);
      console.log(chalk.red('install failed'));
    }
  } else {
    console.log(
      chalk.blue(`
    cd ${projectName}\n
    npm install
    `)
    );
  }
};

module.exports = {
  createProjectAction,
};
