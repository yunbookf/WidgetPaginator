interface WidgetPaginatorTemplete {
    selected: string;
	normal: string;
	omit: string;
}

interface WidgetPaginatorOptions {
    total?: number;
    current?: number;
    count?: number;
    html: WidgetPaginatorTemplete
}

