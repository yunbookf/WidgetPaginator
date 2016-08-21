# WidgetPaginator
轻松在网页上创建好用易用的分页器，可自定义CSS和模板。  
Easily create easy-to-use Paginator on the web page, you can customize templates and CSS.  

## 1.0 release!
使用 TypeScript 重写，可以同时在 TypeScript 或 JavaScript 中使用。  
Use TypeScript to override, you can also use TypeScript or JavaScript.  

```typescript
let wp: WidgetPaginator = new WidgetPaginator("#page", {
    total: 100,
    count: 10,
    current: 2
});
```

随时随地透过组件直接修改相应的值，相关UI会自动响应更新，如：  
Anywhere and at anytime through direct modification of the corresponding value of the component, the UI will automatically respond to updates, such as:  

```typescript
wp.total = 200;
```

且其他条件不变的情况下，那么，UI组件会自动更新为当总条数为 200 时的样子。  
And others under the same conditions, then the UI components are automatically updated when the total number is 200.  

## 如何监听页面被切换了 Listen switch page event
很简单，重写 onChange 事件就可以检测到用户是否切换了页面。  
Simply override onChange events to detect whether the user switch pages.  

```typescript
wp.onChange = function(page: number) {
    alert("您点击了第 " + page.toString() + " 页。");
};
```

若您使用代码如下设置也是会触发 onChage 事件的：  
If you are using a code set will fire the onChage event as follows:  

```typescript
wp.current = 6;
```

## 如何使用 How to use
在页面 script 标签引用 paginator.js 文件即可（或用其他方法动态加载均可）。  
若您是在 TypeScript 中使用 paginator.js，请将 d.ts 文件也放在项目当中。  
Page script tag, reference the paginator.js file (or other dynamic loading can be).  
If you are using paginator.js in TypeScript, place the d.ts file in the project.  

## 浏览器兼容 Compatibility
我们仅兼容现代浏览器，正如我们在 build/demo.html 演示的时候使用了 jQuery 3.1.0 一样。  
We are only compatible with modern browsers, just as when we were build/demo.html demo using jQuery 3.1.0.  

## API

```typescript
interface WidgetPaginatorInstance {
    dom: JQuery;
    total: number;
    current: number;
    count: number;
    pages: number;
    html: WidgetPaginatorTemplete;

    setOpts(opts: WidgetPaginatorOptions): void;

    onChange(page?: number): void;
}
```

## 关于 About
本组件由迈云网络开发开源，欢迎各位PR。  
Powered by Maiyun.net, welcome to pull request.  
http://www.maiyun.net  
  
Translation is provided by Microsoft.