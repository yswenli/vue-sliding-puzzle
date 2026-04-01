# vue-sliding-puzzle [![npm](https://img.shields.io/npm/v/vue-sliding-puzzle.svg)](https://www.npmjs.com/package/vue-sliding-puzzle) [![npm downloads](https://img.shields.io/npm/dt/vue-sliding-puzzle.svg)](https://www.npmjs.com/package/vue-sliding-puzzle)

## 项目介绍

vue-sliding-puzzle 是一个基于 Vue 3 开发的滑动拼图验证码组件，用于防止恶意机器人攻击和自动化操作。它通过让用户拖动滑块完成拼图来验证用户身份，是一种直观且有效的人机验证方式。

### 主要特点

- 🎨 美观的界面设计
- 📱 响应式布局，支持移动端
- 🎯 可自定义的拼图难度和样式
- 🔒 安全可靠的验证机制
- 🎲 支持生成干扰图，增加验证难度
- ⏱️ 内置时间判定，防止快速验证
- 📦 轻量级，易于集成

**DEMO**: https://dev-cyclops.tjingcai.com/admin/

![img](https://github.com/yswenli/vue-sliding-puzzle/blob/master/public/demo.gif)

### 安装
```node
  npm install vue-sliding-puzzle --save
```

### 最简单例子
```vue
<template>
    <Vcode :show="isShow" @success="onSuccess" @close="onClose"/>
    <button @click="onShow">开始验证</button>
</template>

<script setup>
  import { ref } from "vue";
  import Vcode from "vue-sliding-puzzle";

  const isShow = ref(false);

  const onShow = () => {
    isShow.value = true;
  };

  const onClose = () => {
    isShow.value = false;
  };

  const onSuccess = () => {
    onClose(); // 验证成功，手动关闭模态框
  };
</script>
```

### 带干扰图的例子
```vue
<template>
    <Vcode 
      :show="isShow" 
      @success="onSuccess" 
      @close="onClose"
      :slider-text="'请拖动滑块完成验证'"
      :success-text="'验证通过'"
      :interference-diagram-count="3"
    />
    <button @click="onShow">开始验证</button>
</template>

<script setup>
  import { ref } from "vue";
  import Vcode from "vue-sliding-puzzle";

  const isShow = ref(false);

  const onShow = () => {
    isShow.value = true;
  };

  const onClose = () => {
    isShow.value = false;
  };

  const onSuccess = (deviation, obj) => {
    console.log('验证成功，用时：', obj.duration, '毫秒');
    onClose(); // 验证成功，手动关闭模态框
  };
</script>
```

### 参数

| 字段         | 类型    | 默认值             | 说明                                                                          |
| ------------ | ------- | ------------------ | ----------------------------------------------------------------------------- |
| show         | Boolean | false              | 是否显示验证码弹框                                                            |
| type         | String  | "modal"            | "modal"模态框形式 / "inside"内嵌形式                                          |
| canvas-width  | Number  | 310                | 主图区域的宽度，单位 px                                                       |
| canvas-height | Number  | 160                | 主图区域的高度，单位 px                                                       |
| puzzle-scale  | Number  | 1                  | 拼图块(小的拼图)的大小比例，0.2 ～ 2 ，数字越大，拼图越大                     |
| slider-size   | Number  | 50                 | 左下角用户拖动的那个滑块的尺寸，单位 px                                       |
| range        | Number  | 10                 | 判断成功的误差范围，单位 px, 滑动的距离和拼图缺口的距离小于等于此值时，会判定重合 |
| imgs         | Array   | null               | 自定义图片，见下方例子                                                        |
| success-text  | String  | "验证通过！"       | 验证成功时的提示文字                                                          |
| fail-text     | String  | "验证失败，请重试" | 验证失败时的提示文字                                                          |
| slider-text   | String  | "拖动滑块完成拼图" | 下方滑动条里的文字                                                            |
| class-name    | String  | ""               | 给根元素一个class类用于自定义样式                                              |
| z-index       | Number  | 999               | 设置根元素一个层级z-index                                              |
| interference-diagram-count | Number | 0 | 干扰图数量，在现有背景图中生成指定数量的干扰图，位置和大小不同 |
### 事件

| 事件名  | 返回值 | 说明                                                          |
| ------- | ------ | ------------------------------------------------------------- |
| success | 偏差值，对象 | 验证通过时会触发，返回值见下方                               |
| fail    | 偏差值，对象 | 验证失败时会触发，返回值见下方                                |
| close   | null   | 用户点击遮罩层的回调                                          |
| reset   | null   | 用户手动点击右上角刷新按钮时触发的回调                         |

success / fail 的返回值：
```javascript
    deviation: number, // 偏差值，用户滑动的位置 和 拼图缺口所在位置 的距离，单位px
    obj: {
      deviation: number, // 同 deviation
      offsetX: number, // 用户滑动的距离，单位px
      pinX: number, // 拼图缺口的所在位置（相对canvas的左边缘）， 单位px
      duration: number // 用户滑动的用时，单位毫秒
    }
```

### 内嵌形式

入参type="inside"， 将启用内嵌模式
应该用一个元素包裹`<Vcode />`：

```vue
<template>
  <div class="box">
    <Vcode type="inside" :show="isShow" />
  </div>
</template>

<style>
  .box{
    position: relative;
    width: 320px;
    height: auto;
  }
</style>
```

## 使用场景

### 1. 登录注册页面

在用户登录或注册时，使用滑动拼图验证码可以有效防止恶意注册和暴力破解密码。

### 2. 表单提交

在重要表单提交时（如评论、订单提交等），使用验证码可以防止批量提交和垃圾信息。

### 3. API 接口保护

对于开放的 API 接口，可以在调用前要求用户完成滑动拼图验证，防止 API 被滥用。

### 4. 敏感操作

在执行敏感操作（如修改密码、绑定手机等）时，使用验证码可以增加操作的安全性。

## 常见问题

### Q: 如何自定义验证码图片？

A: 可以通过 `imgs` 参数传入自定义图片数组，组件会随机选择其中一张作为背景图。

### Q: 如何调整拼图难度？

A: 可以通过调整 `puzzleScale`（拼图块大小）、`range`（误差范围）和 `interferenceDiagramCount`（干扰图数量）来调整验证难度。

### Q: 如何处理验证失败的情况？

A: 可以监听 `fail` 事件，在事件回调中处理验证失败的逻辑，例如显示错误提示或重新加载验证码。


## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 许可证

MIT License
