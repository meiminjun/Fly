// 过滤函数集合
/**
 * 获取url参数
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
export function getParamToObj(url) {
    let obj = {};
    let href = typeof url === 'undefined' ? window.location.href : url;
    if (href === '') {
        return obj;
    }
    let str = href.substring(href.lastIndexOf('?') + 1);
    let arr = str.split('&');
    arr.forEach(function (v, index) {
        if (v === '') {
            return;
        }
        var item = v.split('=');
        obj[item[0]] = v.substring(v.indexOf('=') + 1); // 处理参数值中还有=号问题
    });
    return obj;
}