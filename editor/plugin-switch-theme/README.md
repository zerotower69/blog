# bytemd-plugin-switch-theme

> This is a plugin for bytemd editor, for
> achieving switch Component Viewer's theme like juejin editor.


## example

```js
import switchTheme from "@zerotower/bytemd-plugin-switch-theme"
import {Viewer} from "bytemd"
const plugins =[
  ...,//other plugins
  switchTheme()
]
```
```template
<Viewer :content="content" :plugins="plugins"/>
```