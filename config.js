/**
 * Created by nanhuijuan on 2017/4/27.
 */
"use strict";

module.exports = {
    repos: [
        {
            name: '开智学堂管理后台',
            path: '/Users/nanhuijuan/openmindclub-admin'
        },
        {
            name: '开智学堂服务端',
            path: '/Users/nanhuijuan/openmindclub-server'
        },
        {
            name: '开智学堂 Web',
            path: '/Users/nanhuijuan/openmindclub-web'
        },
        {
            name: '开智学堂 App',
            path: '/Users/nanhuijuan/openmindclub'
        }
    ],
    author: 'huijuannan',
    contentFormat: { // 周报格式定制，选填，如果为空，那么则使用默认值
        titlePrefix: '', // 标题的前缀，默认是 #
        weekNamePrefix: '', // 周几的前缀，默认是 ###
        repoNamePrefix: '', // 项目名称的前缀，默认是 -
        itemPrefix: '', // 每项 commit message 的前缀，默认是 四个空格加 -
    }
};