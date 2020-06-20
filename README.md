# 需求：
    1、类似datav的可页面编辑大屏
    2、可以生成，可以拖动，可以设置叠加层次（递归）
    3、可以手动添加数据
    4、可以根据api自动获取
    5、尝试写入过滤器（textarea-->js）。可以尝试在代码层次中添加script标签

# 设计
## 设计组件：
 - [*] 最外层一定有一个可以拖动，可以自定义大小
 - [ ] 最外层最好和整个屏幕设置一个比例关系，用于自适应的解决方案
 - [ ] 每个组件在数据库中有相应的id，通过id决定内层使用的样子与设置
 - [ ] 组件可以随意层级嵌套
 - [ ] 每个组件还需要z-index决定层级
 - [*] 每次拖动大小需要重绘
 - [ ] 文字组件需要根据配置字体，阴影
 - [ ] 组件的外边框自定义
 - [ ] 如果使用图表，需要自定义配置

## 设计整体：
 - [ ] 在生成新的模板在数据库中先添加一条记录
 - [ ] 新建的时候有一个最佳分辨率设置
 - [ ] 页面生成的时候还需要有一个缩放，所有的操作都在这个缩放里面进行
 - [ ] 整体背景图片可自定义替换
 - [ ] 层级的嵌套需要在数据库中有递归嵌套（组件自身id）
 - [ ] 使用组件的时候，记录位置。如果嵌套的话，判断x,y的计算可能需要有所变更
 - [ ] 组件的放大缩小也需要记录。如果拖动放大缩小就是scale

## 设计数据库
这里使用mongodb
- [ ] 展示模板列表（工作区）

| 键名  | 类型   | 描述                 |
| ----- | ------ | -------------------- |
| name  | string | 展示使用的工作区名称 |
| order | number | 工作区排序           |


- [ ] 新建模板，添加一个id（mongodb自带）。这个id作为路由的一部分
- Screen template

| 键名        | 类型     | 描述                   |
| ----------- | -------- | ---------------------- |
| parent_area | ObjectId | 所属工作区             |
| name        | string   | 名称                   |
| width       | number   | 模板宽度               |
| height      | number   | 模板高度               |
| mini_img    | string   | 大屏缩略图（未来开发） |


- [ ] 默认已存在组件

| 键名     | 类型   | 描述         |
| -------- | ------ | ------------ |
| name     | string | 组件中文名   |
| codeName | string | 组件代码名称 |
| type     | string | 组件类型     |
| x        | number | 组件x轴位置  |
| y        | number | 组件y轴位置  |
| width    | number | 组件宽度     |
| height   | number | 组件高度     |

- [ ] 自定义组件

| 键名      | 类型   | 描述         |
| --------- | ------ | ------------ |
| parent_id | string | 模板id       |
| name      | string | 组件中文名   |
| codeName  | string | 组件代码名称 |
| type      | string | 组件类型     |
| x         | number | 组件x轴位置  |
| y         | number | 组件y轴位置  |
| width     | number | 组件宽度     |
| height    | number | 组件高度     |

## 未来扩展功能
 - [ ] 账号密码登录，保存各个人的不同项目
 - [ ] 大屏页面加密功能
 - [ ] 拖拽功能中，设置标准线，并设置类似磁力对其效果

# 实际工作日志
- 2020-06-10：计划暂不考虑数据库后端部分，先将拖动部分完成vue-draggable-resizable
- 2020-06-12：完成拖动，修改大小和删除。增加echarts-gl的测试
- 2020-06-16：抽离拖动组件。增加列表自动向上移动的组件
- 2020-06-20：增加大屏增删改查api、增加全局大屏属性