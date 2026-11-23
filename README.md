# ChinaTextbookStudyFree

中小学到大学阶段的**免费教材学习资源导航索引**，纯静态站点，由 GitHub Pages 从 `main` 分支根目录发布。

访问地址：<https://keith279997139.github.io/ChinaTextbookStudyFree/>

## 定位

只做导航，不托管内容：

- 收录教育部主导的国家智慧教育平台系列、出版社自有电子教材页、高校与公益机构的开放课程与开放教材
- 不转载、不镜像、不提供任何教材 PDF 下载
- 每条资源标注主办机构、适用学段与用途，支持关键词检索与学段筛选

## 目录结构

```
index.html            首页：搜索 + 学段筛选 + 资源卡片
guide.html            查找指南：版本/册次识别、检索技巧、常见问题
about.html            关于与免责声明
404.html              自定义 404
assets/
  resources.js        资源清单（唯一需要维护的数据文件）
  app.js              渲染、搜索、筛选逻辑
  style.css           样式
  favicon.svg         站点图标
```

## 维护方式

新增一条资源，只需在 `assets/resources.js` 的数组里追加对象：

```js
{
  name: "资源名称",
  org: "主办机构",
  stage: ["小学", "初中"],        // 小学 / 初中 / 高中 / 大学 / 职教 / 综合
  tags: ["电子课本", "官方"],
  url: "https://example.com/",
  desc: "一句话说明这个平台能解决什么问题。",
  badge: "可选标签"                // 可选
}
```

页面会自动重排，无需改动 HTML。

## 本地预览

静态站点不需要构建，任选一种：

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```

直接双击 `index.html` 也能看，只是个别浏览器对本地 `file://` 读取脚本有限制。

## 版权

站点代码可自由参考。所收录资源的知识产权归各出版机构与平台运营方所有，本站仅提供链接索引，仅供个人学习使用。
