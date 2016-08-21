// import { paginator } from "widget";

import Paginator = require("Paginator");

$(document).ready(function(e) {

    let wp: Paginator = new Paginator(".pageControl:eq(0)");
    wp.onChange = function(p) {
        $(".tip:eq(0)").html("当前第" + p + "页，共" + wp.pages + "页");
    };
    $(".tip:eq(0)").html($(".tip:eq(0)").html().replace(/{{wp.pages}}/g, wp.pages.toString()));
    // --- WIN 10 ---
    let wp2: Paginator = new Paginator(".pageControl:eq(1)", {
        total: 142,
        current: 3
    });
    wp.onChange = function(p) {
        $(".tip:eq(1)").html("Win 10 风格，共" + wp2.total + "条，共" + wp2.pages + "页");
    };
    $(".tip:eq(1)").html($(".tip:eq(1)").html().replace(/{{wp2.pages}}/g, wp2.pages.toString()).replace(/{{wp2.total}}/g, wp2.total.toString()));
});

