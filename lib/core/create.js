const program = require('commander')

const { createProjectAction, createVueAction } = require('./actions/index.js')

const createCommands = () => {

  // 创建指定模板
  program
    .command('create <project> [others...]')
    .description('create a private vue or react project, eg: create projectName react')
    .action((project, others) => {
      createProjectAction(project, others)
    })

}

module.exports = createCommands