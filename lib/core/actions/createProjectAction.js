const { promisify } = require('util');
const download = promisify(require('download-git-repo'));
const chalk = require('chalk');
const ora = require('ora');
const { commandSpawn } = require('../../utils/terminal');
const inquirer = require('inquirer');
const fs = require('fs');
const { readJson } = require('../../utils/readJson');

const createProjectAction = async (projectName, others) => {
  const { jsonObj } = await readJson();

  const yarnOptions = await inquirer.prompt([
    {
      type: 'list',
      name: 'useFrame',
      message: 'Choosing a framework to Use',
      choices: Object.keys(jsonObj),
    },
    {
      type: 'confirm',
      name: 'useYarn',
      message: 'Yarn is a package manager, Install or not',
      default: true,
    },
  ]);

  const templateAddress = jsonObj[yarnOptions.useFrame];

  const processTips = ora(`Downloading a ${yarnOptions.useFrame} template...`);
  processTips.color = 'magenta';
  processTips.start();

  try {
    await download(templateAddress, projectName, { clone: true });
    processTips.color = 'green';
    processTips.text = `${yarnOptions.useFrame} Download successfully, check the file`;
  } catch (err) {
    console.log(err);
    processTips.color = 'red';
    processTips.text = `The download failed. Refer to the error message`;
    processTips.fail();
    return;
  }

  try {
    await fs.promises.access(
      `./${projectName}/package.json`,
      fs.constants.F_OK | fs.constants.W_OK
    );
    processTips.color = 'magenta';
    processTips.text = `${yarnOptions.useYarn ? 'yarn' : 'npm'} install...`;
    processTips.succeed();
  } catch (err) {
    console.log(err);
    processTips.color = 'red';
    processTips.text = `The download failed. Refer to the error message`;
    processTips.fail();
    return;
  }

  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const yarnCommand = process.platform === 'win32' ? 'yarn.cmd' : 'yarn';

  if (yarnOptions.useFrame) {
    try {
      await commandSpawn(yarnCommand, ['-v']).catch(async (err) => {
        const processTips = ora(`Downloading a yarn...`);
        processTips.color = 'magenta';
        processTips.start();
        await commandSpawn(npmCommand, ['install', 'yarn', '-g']);
        processTips.color = 'green';
        processTips.text = `install successfully...`;
        processTips.succeed();
      });

      await commandSpawn(yarnCommand, ['install'], { cwd: `./${projectName}` });
    } catch (err) {
      processTips.color = 'red';
      processTips.text = `Download failed, try: npm install yarn -g`;
      processTips.fail();
    }
  } else {
    try {
      await commandSpawn(npmCommand, ['install'], { cwd: `./${projectName}` });
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = {
  createProjectAction,
};
