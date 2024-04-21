# bytemd-plugin-copy-code

> Copy code plugin like juejin editor.

## examples

```jsx
import { Viewer } from "bytemd"
import copyCode from '@zerotower/bytemd-plugin-copy-code';
//your language prefer
import zh_CN from '@zerotower/bytemd-plugin-copy-code/locales/zh_Hans.json';

<
Viewer
plugins = { [copyCode({ locale:zh_CN })] }
/>
```
