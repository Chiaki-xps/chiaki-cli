const program = require('commander')

const { createProjectAction } = require('./actions')

const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('create a vue or react project, eg: create projectName react')
    .action((project, others) => {
      createProjectAction(project, others)
    })
}

module.exports = createCommands