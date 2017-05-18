# git commit message 生成周报

这是一个根据配置的 git 仓库，将当周提交的 git message 整理成周报的脚本。

## 安装

```bash
npm install -g git-weekly
```

## 如何使用

### 初始化

```bash
mkdir test-weekly && cd test-weekly
git-weekly init
```

- 会在当前目录下，创建配置文件 `weekly.config.json`

### 配置 git 仓库

打开生成的 `weekly.config.json` 文件，将配置需要生成报告的 git 仓库

- `repo` ：仓库列表

  - `path`：项目仓库的绝对路径
  - `name`：周报中显示的项目名称，根据自己的习惯任取

- `author`：git 用户名，一般会根据 `git config --get user.name ` 自动生成

- `contentFormat`：选填，用于配置生成的 markdown 格式

  - titlePrefix: 标题的前缀，默认是一级标题 `#`
  - weekNamePrefix: 周的前缀，默认是三级标题 `###`
  - repoNamePrefix: 项目名称的前缀，默认是一级列表  `-`
  - itemPrefix:  每项 commit message 的前缀，默认是二级列表， `四个空格加-`
- `numOfDaysInWeek`: 选填，代表一周是几天。如，是 5 的话，就是从周一到周五。7 就是从周一到周日。默认为 5

### 生成周报

```
git-weekly
```

生成的周报存放于 `./output` 下。

### 生成前 n 周的周报

- 生成上一周的周报：

```
git-weekly -p 1
```

## 其他选项

```
Usage: git-weekly [options] [command]


  Commands:

    init   初始化配置

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -c, --config [config-file]  指定配置文件
    -o, --output [output-dir]   指定报告存放的路径
    -p, --prev <numberOfWeek>   指定生成 n 周前的报告

```


## 报告示例


```markdown
# 20170424-20170430
### 周一
- 某项目服务端
    - add repo name check regular express
### 周二
- 某项目服务端
    - 完成回调体对 request body 的解析，提取相应信息
    - 完成用户自主购买课程的基本逻辑
### 周三
- 某项目管理后台
    - feat: 添加了课程销售配置 tab
- 某项目服务端
    - fix bug: tag_controller 验证 card 是否存在
    - 将商品的 alias 和链接一并存在数据库
### 周四
- 某项目管理后台
    - get email templates from server
    - merge
    - feat: 系统配置添加了开课默认配置项
- 某项目服务端
    - fix: 添加了对返回结果的验证
    - add get email templates api
### 周五
```
