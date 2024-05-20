# standard
**所有的组件尽量不使用原本库export出来的(antd，dayjs，next组件这些)**，都必须在这里二次封装才能在外部使用，例如
```ts
// import { Button } from 'antd';
import { Button } from 'standard/antd';
// import Link from 'next/link'
import Link from 'standard/link'
```
## why
### 1
如果你有一个Link组件突然要支持
- 只传入 href='/to-xxx'
- 但是需要根据一级语言路由，输出不同的href
  - 如果一级路由是 /en/from-xxx，   需要输出 /en/to-xxx
  - 如果一级路由是 /from-xxx，      需要输出 /to-xxx

以上这个情况除了inject代码（这个还有服务端和客户端不统一的问题），剩下的情况就是一个个人手改，或者上webpack plugin替换，哪种方式都是增加了复杂度的

### 2
通过二次封装ui库的组件，改掉其中的icon和间距字体大小等样式，避免出现这里一块样式那里一块的情况
**最重要的是避免出现扯皮，今天一套明天一套设计的情况，今天的又不改成明天的设计**

## how
以`next/link`为例，封装一个最简单的
```tsx
// standard/link.ts
import NLink from 'next/link'
import { ComponentProps, FC } from 'react'

type Props = ComponentProps<typeof NLink>
const Link: FC<Props> = props => {
  return <NLink {...props} />
}

export default Link
```

**需要避免过大的样式和功能的直接替换，尽量保持与原组件一致的功能和样式，可以在standard组件上二次开发到src/components**