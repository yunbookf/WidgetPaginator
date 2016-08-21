class WidgetPaginator {

    public dom: JQuery;
    public static verison: string = "1.0";

    // --- 总条数 ---
    private _total: number = 500;
    get total(): number {
        return this._total;
    }
    set total(val: number) {
        if (val !== this._total) {
            this._total = val;
            this.render();
        }
    }

    // --- 当前页数 ---
    private _current: number = 1;
    get current(): number {
        return this._current;
    }
    set current(val: number) {
        if (val !== this._current) {
            this._current = val;
            this.onChange(val);
            this.render();
        }
    }

    // --- 每页条数 ---
    private _count: number = 10;
    get count(): number {
        return this._count;
    }
    set count(val: number) {
        if (val !== this._count) {
            this._count = val;
            this.render();
        }
    }

    // --- 总共页数 READONLY ---
    private _pages: number;
    get pages(): number {
        return this._pages;
    }

    // --- 模板 ---
    private _html: WidgetPaginatorTemplete = {
        selected: `<span class="selected">{p}</span>`,
        normal: `<span class="normal" page="{p}">{p}</span>`,
        omit: `<span class="omit">...</span>`
    };
    get html(): WidgetPaginatorTemplete {
        return this._html;
    }
    set html(val: WidgetPaginatorTemplete) {
        if (val.normal) {
            val.normal = val.normal.replace(/>/, ` page="{p}">`);
        }
        for (let k in val)
            this._html[k] = val[k];
        this.render();
    }

    // --- 析构方法 ---
    constructor(d: any, opts?: WidgetPaginatorOptions) {
        let dom: JQuery = $(d);
        dom.addClass("widgetPaginator");
        this.dom = dom;
        // --- 预设 ---
        this.setOpts(opts);
    }

    // --- 批量设置 Opts 统一渲染 ---
    public setOpts(opts: WidgetPaginatorOptions): void {
        if (opts) {
            for (let key in opts) {
                if (key === "html") {
                    if (opts[key].normal)
                        opts[key].normal = opts[key].normal.replace(/>/, ` page="{p}">`);
                    for (let k in opts[key])
                        this._html[k] = opts[key][k];
                } else {
                    this["_" + key] = opts[key];
                }
            }
        }
        this.render();
    }

    // --- 重新渲染 ---
    private render(): void {
        let html: string = "";
        let allPage: number = this._total / this._count;
		// --- 不足 1 则页面内容小于 1 页所能承载的，fix bug ---
        if (allPage < 1) allPage = 1;
		// --- 也有可能最后一页不满一页，那也要计算啊，fix bug ---
        else if (allPage.toString().indexOf(".") !== -1) {
            allPage = Math.ceil(allPage);
        }
        // --- 将全部页导入只读属性 ---
        this._pages = allPage;
        let toPage: number = ((this._current + 4) >= allPage) ? allPage : this._current + 4;
        let fromPage: number = ((this._current - 4) <= 1) ? 1 : this._current - 4;
        // --- 开始组建 ---
        // --- 前导 ---
        if (this._current >= 7)
            html = this._html.normal.replace(/\{p\}/g, "1") + this._html.omit;
        else if (this._current === 6)
            html = this._html.normal.replace(/\{p\}/g, "1");
        // --- 中部 ----
        for (let p = fromPage; p <= toPage; ++p) {
            if (this._current === p)
                html += this._html.selected.replace(/\{p\}/g, p.toString());
            else
                html += this._html.normal.replace(/\{p\}/g, p.toString());
        }
        // --- 尾随 ---
        if (toPage < allPage - 1)
            html += this._html.omit + this._html.normal.replace(/\{p\}/g, allPage.toString());
        else if (toPage === allPage - 1)
            html += this._html.normal.replace(/\{p\}/g, allPage.toString());
        // --- 加载到 DOM 里 ---
        this.dom.html(html);
        // --- 绑定事件 ---
        this.dom.find(".normal").on("click", (function(e: Event): void {
            this.current = parseInt($(e.currentTarget).attr("page"));
        }).bind(this));
    }

    // --- 事件 ---
    public onChange(page?: number): void {};

}

