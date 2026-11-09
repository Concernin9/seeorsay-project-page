# SeeOrSay 项目主页

这个仓库就是论文 **SeeOrSay** 的项目主页：纯静态网页，不需要编译，也不需要装任何东西。

- 所有字体、图片、视频和脚本都在仓库里，不连外部网站，国内打开也不受影响。
- 页面右上角可以切换中文 / English。

## 一、第一次上线（大约 5 分钟，只用浏览器）

1. **新建仓库**
   - 登录 GitHub，点右上角 **+ → New repository**。
   - Repository name 填 `seeorsay`（也可以换别的名字，它会出现在网址里）。
   - 选 **Public**。下面的 README、.gitignore、license 都**不要勾**。
   - 点 **Create repository**。
2. **上传文件**
   - 在新仓库页面点 **uploading an existing file**。
   - 把这个文件夹里的**全部内容**拖进上传框：`index.html`、`static` 文件夹、`README.md`。拖的是文件夹里面的东西，不是文件夹本身，要保证 `index.html` 在仓库最外层。
   - 等进度条走完，点 **Commit changes**。
3. **打开网页发布**
   - 进入仓库的 **Settings → Pages**。
   - Build and deployment 下面：Source 选 **Deploy from a branch**，Branch 选 **main**，文件夹选 **/(root)**，点 **Save**。
4. **拿到网址**
   - 等 1–3 分钟，刷新 Settings → Pages，页面顶部会出现网址：`https://<你的用户名>.github.io/seeorsay/`。
   - 以后每次改文件并 Commit，网站会自动更新。

> **用 git 命令行的话**，第 2 步可以换成下面这几条（`<你的用户名>` 换成自己的）：
> ```bash
> git clone https://github.com/<你的用户名>/seeorsay.git
> cp -R seeorsay-project-page/. seeorsay/
> cd seeorsay && git add . && git commit -m "SeeOrSay project page" && git push
> ```

**本地预览**：直接双击 `index.html`，用浏览器打开就行，效果和线上一样。

## 二、以后常改的地方（都在 `index.html` 里）

**论文挂上 arXiv 以后**，找到这一段：

```html
<span class="btn soon" title="Coming soon">
  ...
  <span data-i18n data-zh="论文">Paper</span><span class="tag" data-i18n data-zh="即将上线">soon</span></span>
```

整段换成下面这样（链接换成真实的）：

```html
<a class="btn" href="https://arxiv.org/abs/XXXX.XXXXX">
  <span data-i18n data-zh="论文">Paper</span></a>
```

Supplementary、Code、Data 三个按钮的改法一样。如果要把 PDF 直接放在网站上，可以放进 `static/pdfs/`，链接写 `static/pdfs/xxx.pdf`。

**加作者名**：在 `<div class="affils">` 的上一行加：

```html
<p class="authors">张三 · 李四 · 王五</p>
```

**改单位**：改 `<div class="affils">` 里的两行，比如把 `Tsinghua University` 改成 `清华大学`。页脚 `<footer>` 里还有一处，也要一起改。

**开源说明**：搜 `released upon acceptance`，一共三处，改成需要的说法即可。

**每段文字都有中英两份**：英文写在标签里面，中文写在同一个标签的 `data-zh="..."` 里。只改其中一种语言也能用，但两种都改，切换中英文时才一致。

## 三、文件说明

| 路径 | 内容 |
|---|---|
| `index.html` | 整个页面 |
| `static/css/style.css` | 样式 |
| `static/js/main.js` | 页面里的动态效果：首页字符画动画、视频自动播放、逐 token 解码演示、图库切换、点击放大、中英切换 |
| `static/js/data.js` | 字符画和解码演示用到的数据，来自真实测试片段和 SeeOrSay-8B 的原样输出 |
| `static/videos/` | 8 段结果视频（mp4）和对应的封面图 |
| `static/images/paper/` | 论文里的图 |
| `static/images/clips/` | 解码演示用到的真实帧 |
| `static/fonts/` | Inter 和 DejaVu Sans Mono 字体（开源字体，授权说明见同目录） |

**大小**：全部文件约 20 MB，最大的单个文件不到 1 MB，GitHub 网页上传没有问题。网页上传一次最多 100 个文件，这个包在限制以内。
