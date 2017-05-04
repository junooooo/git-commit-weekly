# git commit message 生成周报

这是一个根据配置的 git 仓库，将 git message 整理成周报的脚本。

## 示例

在项目根目录下，运行`npm start`，即可生成如下格式的周报：

```markdown
# 20170424-20170430
### 周一
- 开智学堂服务端
    - add repo name check regular express
### 周二
- 开智学堂服务端
    - 完成回调体对有赞的 request body 的解析，提取相应信息
    - 完成用户自主购买课程的基本逻辑
### 周三
- 开智学堂管理后台
    - feat: 添加了课程销售配置 tab
- 开智学堂服务端
    - fix bug: tag_controller 验证 card 是否存在
    - 将有赞商品的 alias 和链接一并存在数据库
### 周四
- 开智学堂管理后台
    - get email templates from server
    - merge
    - feat: 系统配置添加了开课默认配置项
- 开智学堂服务端
    - fix: 添加了对 sendcloud 返回结果的验证
    - add sendcloud get email templates api
### 周五
### 周六
### 周日
```

## 如何使用

### 配置项目`config.js`

- `repo` ：自己参与的项目列表

  - `path`：项目仓库的绝对路径
  - `name`：周报中显示的项目名称，根据自己的习惯任取

- `author`：git 用户名，可以通过`git config --get user.name `获取

- `contentFormat`：选填，用于配置生成的 markdown 格式

  - titlePrefix: 标题的前缀，默认是一级标题 `# `
  - weekNamePrefix: 周的前缀，默认是三级标题 `### `
  - repoNamePrefix: 项目名称的前缀，默认是一级列表  `- `
  - itemPrefix:  每项 commit message 的前缀，默认是二级列表， `四个空格加- `




### 生成周报

配置完成以后，`npm start`即可。周报在 `output`文件夹中查看。