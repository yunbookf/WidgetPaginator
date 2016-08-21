interface WidgetPaginatorTemplete {
    selected: string;
	normal: string;
	omit: string;
}

interface WidgetPaginatorOptions {
    total?: number;
    current?: number;
    count?: number;
    html?: WidgetPaginatorTemplete
}

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

interface WidgetPaginatorConstructor {
    new(d: any, opts?: WidgetPaginatorOptions): WidgetPaginatorInstance;

    version: string;
}

// declare let WidgetPaginator: WidgetPaginatorConstructor;

