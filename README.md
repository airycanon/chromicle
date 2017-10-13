# Chromicle
Chromicle 的名字来自 chronicle + Chrome，是一个展示历史记录的 Chrome 扩展。

Chrome 早期的历史记录一直比较弱，尽管目前 UI 已经使用了 Material，功能也丰富了，但仍然缺少我要的几个功能，因此才有了本项目。

# 特性
- [ ]  支持 Chrome 自带历史记录的所有特性（目前不支持展示其他设备的历史记录）
- [ ]  支持按时间分段展示（目前仅默认的间隔为 1 分钟，后续会自持自定义间隔）
- [x]  支持按时间段删除
- [x]  支持按日期筛选
- [x]  支持全选和删除
- [x]  支持添加到书签


# 安装

可以从 [Chrome 应用商店](https://chrome.google.com/webstore/detail/chromicle/ljblncheanainapijcjkljcbcjjmnnag?hl=zh-CN) 或者 [下载](https://airycanon.me/static/chromicle.crx) 安装本项目

# 开发

* 安装依赖
```
yarn
```
* 运行（在 Chrome 扩展下不支持 hot reload，因此需要手动刷新页面）
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


