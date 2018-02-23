let formatDate = (dateStr, format) => {
    let date = new Date(dateStr);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let min = date.getMinutes();
    let s = date.getSeconds();
    if (m < 10) {
        m = "0" + m;
    }
    if (d < 10) {
        d = "0" + d;
    }
    if (format == "yyyy-MM-dd hh:mm:ss") {
        return `${y}-${m}-${d} ${h}:${min}:${s}`
    } else if (format == "yyyy-MM-dd") {
        return `${y}-${m}-${d}`
    } else if (format == "yyyy/MM/dd") {
        return `${y}/${m}/${d}`
    }
    return "";
}

let getClientType = () => {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile"

    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        return "IOS";
    } else if (navigator.userAgent.match(/android/i) == "android") {
        return "Android";
    } else {
        return "PC";
    }
}

let isFromWeixin = () => {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i)) {
        return true;
    } else {
        return false;
    }
}

let appEditorConverter = (str) => {
    let regExp = new RegExp("\n", "g");
    return str.replace(regExp, "<br/>");
}

let getReadQty = (num) => {
    let qtyStr = "";
    if (num) {
        let intQty = parseInt(num);
        if (intQty > 10000) {
            qtyStr += parseInt(intQty / 10000);
            let thousand = intQty % 10000;
            if (thousand >= 1000) {
                qtyStr += "." + parseInt(thousand / 1000);
            }
            qtyStr += "W";
            if ((thousand % 1000) > 0) {
                qtyStr += "+";
            }
        } else {
            qtyStr += intQty;
        }
    } else {
        qtyStr = "0";
    }
    return qtyStr;
}

let setPageInfo = (info) => {
    if (info) {
        /* 基本处理,可以解决非微信端问题 */
        let meta = document.getElementsByTagName('meta');
        if (info.title) {
            document.title = info.title + "|V电影";
            meta["sharecontent"].setAttribute("data-msg-title", info.title);
            meta["sharecontent"].setAttribute("data-line-title", info.title);
        }
        if (info.desc) {
            meta["description"].setAttribute("content", info.desc);
            meta["sharecontent"].setAttribute("data-msg-content", info.desc);
            meta["sharecontent"].setAttribute("data-line-content", info.title);
        }
    }
}

let convertDuration = (duration) => {
    let result = "";
    if (duration) {
        if (duration > 60) {
            let min = parseInt(duration / 60);
            let sec = parseInt(duration % 60);
            result = (min > 9 ? min : ("0" + min)) + ":" + (sec > 9 ? sec : ("0" + sec));
        } else {
            result = (duration > 9 ? duration : ("0" + duration));;
        }
    }
    return result;
}

let buildVisitCount = (count) => {
    if (count <= 1000) {
        return count;
    }
    if (count < 10000) {
        return parseInt(count / 1000) + "k+";
    }
    return "1w+";
}

let buildTopicSummary = (markdownStr) => {
    while (markdownStr.indexOf('src=\"//dn-cnode.qbox.me') >= 0) {
        markdownStr = markdownStr.replace('src=\"//dn-cnode.qbox.me', "src=\"http://dn-cnode.qbox.me");
    }
    return markdownStr;
}

export default {
    formatDate: formatDate,
    getClientType: getClientType,
    isFromWeixin: isFromWeixin,
    appEditorConverter: appEditorConverter,
    getReadQty: getReadQty,
    setPageInfo: setPageInfo,
    convertDuration: convertDuration,
    buildVisitCount: buildVisitCount,
    buildTopicSummary: buildTopicSummary
}