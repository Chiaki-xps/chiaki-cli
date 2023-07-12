
# Chiaki-CLI

一个可以管理自己项目模板，并快速搭建的脚手架。

## Documentation

1. 全局安装

   ```shell
   npm install chiaki-cli -g
   ```

2. 查看版本

   ```shell
   chiaki --version
   ```

3. 查看指令

   ```shell
   chiaki --help
   ```

4. 添加自己的项目

   ```shell
   chiaki add <project-name> <github-url>
   ```

   + 支持链接格式：

     `https`

     ```https
     https://github.com/Chiaki-xps/chiaki-cli
     ```

     指定分支

     ```https
     github.com:Chiaki-xps/chiaki-cli#master
     ```

5. 检查已经添加的项目

   ```shell
   chiaki checkout
   ```

   + 内部预设了vue和react的我个人的模板

6. 创建项目

   ```shell
   chiaki create <project-name>
   ```

7. 删除项目

   ```shell
   chiaki delete [name]
   ```

## Version

+ **1.0.0:** 通过命令创建预设好的模板,安装包。
+ **1.0.1:** 增加了`add`，`checkout`，`delete`方法。
+ **1.0.3:** 去掉了安装yarn的选项，直接npm install。优化了控制台提示。去掉了自定义模板的功能。
