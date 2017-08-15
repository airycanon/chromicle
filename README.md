# Chromicle
Chromicle 是一个展示历史记录的 Chrome 扩展，Chrome 早期的历史记录一直比较弱，尽管目前在 UI 和功能上做了改进，但仍然缺少我要的几个功能：

* 不支持按日期筛选
* 只支持单个勾选，不支持全选

目前比较好的第三方扩展是 Better History，但没有完全符合我的要求，因此才有了本项目。

#安装

可以从 [chrome 应用商店](https://chrome.google.com/webstore/detail/chromicle/ljblncheanainapijcjkljcbcjjmnnag?hl=zh-CN)或者 [下载](https://airycanon.me/static/chromicle.crx) 安装本项目

# 开发

* 安装依赖
```
yarn
```
* 运行（在 Chrome 扩展模式下没有找到 hot reload 的方法，因此需要手动刷新页面）
```
npm run dev
```
* 发布（输出文件在 build 中）
```
npm run prod
```

# 本项目依赖以下项目

* [React](https://github.com/facebook/react)
* [Mobx](https://github.com/mobxjs/mobx-react)
* [Ant Design](https://github.com/ant-design/ant-design)


