const program = require("commander");

const {
  createProjectAction,
  createAddAction,
  createCheckoutAction,
} = require("./actions/index.js");

const createCommands = () => {
  // 创建指定模板
  program
    .command("create <project> [others...]")
    .description(
      "create a private vue or react project, eg: create projectName react"
    )
    .action((project, others) => {
      createProjectAction(project, others);
    });

  program
    .command("checkout")
    .description("查看已经添加的项目")
    .action(() => {
      createCheckoutAction();
    });

  program
    .command("add <projectName> <url>")
    .description("添加你的项目快捷方式")
    .action((project, url) => {
      createAddAction(project, url);
    });
};

module.exports = createCommands;
