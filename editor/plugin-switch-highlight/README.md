# bytemd-plugin-switch-highlight

> This is a plugin for bytemd editor, for
> achieving switch Viewer's theme like juejin editor.


## example

```js
import switchTheme from "@zerotower/bytemd-plugin-switch-theme"
import {Viewer} from "@bytemd/vue-next"
const plugins =[
  ...,//other plugins
  switchTheme()
]
```
```template
<Viewer :content="content" :plugins="plugins"/>
```