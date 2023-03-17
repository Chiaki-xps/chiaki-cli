const { promisify } = require('util');
const download = promisify(require('download-git-repo'));
const chalk = require('chalk')
const ora = require('ora')
const { repoAddress } = require('../../config/repo-config')
const { commandSpawn } = require('../../utils/terminal')
const inquirer = require('inquirer')
const fs = require('fs')

const createProjectAction = async (project, others) => {

  const yarnOptions = await inquirer.prompt([
    {
      type: 'list',
      name: 'useFrame',
      message: 'Choosing a framework to Use',
      default: 'react',
      choices: ['React', 'Vue3']
    },
    {
      type: 'confirm',
      name: 'useYarn',
      message: 'Yarn is a package manager, Install or not',
      default: true
    }
  ])

  let npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  let templateAddress = repoAddress[yarnOptions.useFrame.toLowerCase()];
  
  if (!Object.keys(repoAddress).includes(yarnOptions.useFrame.toLowerCase())) {
    console.log(chalk.red.bold.bgWhite(`下载失败,目前只支持输入React和Vue3,eg: chiaki create <projectName>`))
    return
  }

  const processTips = ora(`Downloading a ${yarnOptions.useFrame} template...`)
  processTips.color = 'magenta'
  processTips.start()

  try {
    console.log(templateAddress);
    await download(templateAddress, project);
    processTips.color = 'blue'
    processTips.text = `${yarnOptions.useFrame} Download successfully, check the file`
  } catch(err) {
    console.log(err);
    processTips.color = 'red'
    processTips.text = `The download failed. Refer to the error message`
    processTips.fail()
  }

  try {
    await fs.promises.access(`./${project}/package.json`, fs.constants.F_OK | fs.constants.W_OK)
    processTips.color = 'green'
    processTips.text = `npm install...`
    processTips.succeed()
  } catch(err) {
    console.log(err);
    processTips.color = 'red'
    processTips.text = `The download failed. Refer to the error message`
    processTips.fail()
    return
  }

  if (yarnOptions.useYarn) {
    yarnCommand = process.platform === 'win32' ? 'yarn.cmd' : 'yarn'

    try {
      await commandSpawn(yarnCommand, ['-v']).catch( async (err) => {
        const processTips = ora(`Downloading a yarn...`)
        processTips.color = 'magenta'
        processTips.start()
        await commandSpawn(npmCommand, [ 'install', 'yarn', '-g' ])
        processTips.color = 'green'
        processTips.text = `install successfully...`
        processTips.succeed()

        
      })

      await commandSpawn(yarnCommand, ['install'], {cwd: `./${project}`})

    } catch (err) {
      console.log(chalk.white.bold.bgRed(`Download failed, try: npm install yarn -g`))
    }
  }

}

module.exports = {
  createProjectAction,
}