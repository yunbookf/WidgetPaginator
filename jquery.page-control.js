/**
 * Weinixuanze Library
 */

(function($) {
	$.fn.extend({
		pageControl: function(count, page, current) {
			// --- 获取页面控制 HTML 代码 ---
			if(this.data('jpc-html')) {
				var data = this.data('jpc-html');
				var curHTML = data.curHTML;
				var norHTML = data.norHTML;
				var sirHTML = data.sirHTML;
			} else {
				var curHTML = this.children(':eq(0)')[0].outerHTML; // 当前页
				var norHTML = this.children(':eq(1)')[0].outerHTML; // 普通页
				var sirHTML = this.children(':eq(2)')[0].outerHTML; // 省略页
				this.data('jpc-html', {
					'curHTML': curHTML,
					'norHTML': norHTML,
					'sirHTML': sirHTML
				});
			}
			// --- 创建要添加的 html 代码变量 ---
			var html = '';
			var allPage = count / page;
			// --- 不足 1 则页面内容小于 1 页所能承载的，fix bug ---
			if(allPage < 1) allPage = 1;
			// --- 也有可能最后一页不满一页，那也要计算啊，fix bug ---
			else if(allPage.toString().indexOf('.') != -1) allPage = parseInt(allPage) + 1;
			var toPage = ((current + 4) >= allPage) ? allPage : current + 4;
			var fromPage = ((current - 4) <= 1) ? 1 : current - 4;
			// --- 开始组建 ---
			// --- 前导 ---
			if(current >= 7)
				html = norHTML.replace(/\{p\}/g, '1') + sirHTML;
			else if(current == 6)
				html = norHTML.replace(/\{p\}/g, '1');
			// --- 中部 ----
			for(var p = fromPage; p <= toPage; ++p) {
				if(current == p)
					html += curHTML.replace(/\{p\}/g, p);
				else
					html += norHTML.replace(/\{p\}/g, p);
			}
			// --- 尾随 ---
			if(toPage < allPage - 1)
				html += sirHTML + norHTML.replace(/\{p\}/g, allPage);
			else if(toPage == allPage - 1)
				html += norHTML.replace(/\{p\}/g, allPage);
			// --- 填充 HTML ---
			this.html(html);
		}
	});
})(jQuery);


