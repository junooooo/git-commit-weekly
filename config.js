/**
 * Created by nanhuijuan on 2017/4/27.
 */
"use strict";

module.exports = {
    repos: [
        {
            name: '自定义项目名称',
            path: '/absolute/path/to/repo'
        }
    ],
    author: '',
    contentFormat: { // 周报格式定制，选填，如果为空，那么则使用默认值
        titlePrefix: '', // 标题的前缀，默认是 #
        weekNamePrefix: '', // 周几的前缀，默认是 ###
        repoNamePrefix: '', // 项目名称的前缀，默认是 -
        itemPrefix: '', // 每项 commit message 的前缀，默认是 四个空格加 -
    },
    numOfDaysInWeek: null // 几天为一周：如，是 5 的话，就是从周一到周五。默认为 5
};