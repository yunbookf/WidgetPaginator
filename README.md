# WidgetPaginator
方便组件化的创建页面分页器。

## 1.0 正式 release！
使用 TypeScript 重写，可以同时在 TypeScript 或 JavaScript 中使用。

```typescript
let wp: WidgetPaginator = new WidgetPaginator("#page", {
    total: 100,
    count: 10,
    current: 2
});
```

随时随地透过组件直接修改相应的值，相关UI会自动响应更新，如：

```typescript
wp.total = 200;
```

且其他条件不变的情况下，那么，UI组件会自动更新为当总条数为 200 时的样子。