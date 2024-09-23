# 🎃水印组件 Watermark Component

水印的实现原理就是加一个和目标元素宽高一样的 div 覆盖在上面，设置 pointer-events:none 不响应鼠标事件。

然后背景用水印图片 repeat 实现。

这个水印图片是用 canvas 画的，传入文字或者图片，会计算 gap、文字宽高等，在正确的位置绘制出来。

之后转成 base64 之后设置为 background-image。

此外，还要支持防删除功能，也就是用 MutationObserver 监听水印节点的属性变动、节点删除等，有变化就重新绘制一个。