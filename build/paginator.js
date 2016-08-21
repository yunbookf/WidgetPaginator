var WidgetPaginator = (function () {
    function WidgetPaginator(d, opts) {
        this._total = 500;
        this._current = 1;
        this._count = 10;
        this._html = {
            selected: "<span class=\"selected\">{p}</span>",
            normal: "<span class=\"normal\" page=\"{p}\">{p}</span>",
            omit: "<span class=\"omit\">...</span>"
        };
        var dom = $(d);
        dom.addClass("widgetPaginator");
        this.dom = dom;
        this.setOpts(opts);
    }
    Object.defineProperty(WidgetPaginator.prototype, "total", {
        get: function () {
            return this._total;
        },
        set: function (val) {
            if (val !== this._total) {
                this._total = val;
                this.render();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WidgetPaginator.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (val) {
            if (val !== this._current) {
                this._current = val;
                this.onChange(val);
                this.render();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WidgetPaginator.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (val) {
            if (val !== this._count) {
                this._count = val;
                this.render();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WidgetPaginator.prototype, "pages", {
        get: function () {
            return this._pages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WidgetPaginator.prototype, "html", {
        get: function () {
            return this._html;
        },
        set: function (val) {
            if (val.normal) {
                val.normal = val.normal.replace(/>/, " page=\"{p}\">");
            }
            for (var k in val)
                this._html[k] = val[k];
            this.render();
        },
        enumerable: true,
        configurable: true
    });
    WidgetPaginator.prototype.setOpts = function (opts) {
        if (opts) {
            for (var key in opts) {
                if (key === "html") {
                    if (opts[key].normal)
                        opts[key].normal = opts[key].normal.replace(/>/, " page=\"{p}\">");
                    for (var k in opts[key])
                        this._html[k] = opts[key][k];
                }
                else {
                    this["_" + key] = opts[key];
                }
            }
        }
        this.render();
    };
    WidgetPaginator.prototype.render = function () {
        var html = "";
        var allPage = this._total / this._count;
        if (allPage < 1)
            allPage = 1;
        else if (allPage.toString().indexOf(".") !== -1) {
            allPage = Math.ceil(allPage);
        }
        this._pages = allPage;
        var toPage = ((this._current + 4) >= allPage) ? allPage : this._current + 4;
        var fromPage = ((this._current - 4) <= 1) ? 1 : this._current - 4;
        if (this._current >= 7)
            html = this._html.normal.replace(/\{p\}/g, "1") + this._html.omit;
        else if (this._current === 6)
            html = this._html.normal.replace(/\{p\}/g, "1");
        for (var p = fromPage; p <= toPage; ++p) {
            if (this._current === p)
                html += this._html.selected.replace(/\{p\}/g, p.toString());
            else
                html += this._html.normal.replace(/\{p\}/g, p.toString());
        }
        if (toPage < allPage - 1)
            html += this._html.omit + this._html.normal.replace(/\{p\}/g, allPage.toString());
        else if (toPage === allPage - 1)
            html += this._html.normal.replace(/\{p\}/g, allPage.toString());
        this.dom.html(html);
        this.dom.find(".normal").on("click", (function (e) {
            this.current = parseInt($(e.currentTarget).attr("page"));
        }).bind(this));
    };
    WidgetPaginator.prototype.onChange = function (page) { };
    ;
    WidgetPaginator.verison = "1.0";
    return WidgetPaginator;
}());
//# sourceMappingURL=Paginator.js.map