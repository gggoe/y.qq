var utils = (function () {
    function myAnimate(options) {

        var curEle = options.curEle;
        var change = options.change;
        var _time = options.time;
        var callBack = options.callBack;
        var timer;
        var begin = {};
        var end = {};
        var move = {};

        for (var key in change) {
            begin[key] = parseFloat(window.getComputedStyle(curEle, null)[key]);
            end[key] = change[key];
            move[key] = end[key] - begin[key];
        }

        clearInterval(curEle.timer);

        var time = 0;
        timer = setInterval(function () {
            time += 15;
            for (var key in change) {
                if (key != 'opacity') {
                    time <= _time ? curEle.style[key] = time / _time * move[key] + begin[key] + 'px' : (curEle.style[key] = end[key] + 'px', clearInterval(timer));
                }
                time <= _time ? curEle.style[key] = time / _time * move[key] + begin[key] : (curEle.style[key] = end[key], clearInterval(timer));
            }
        }, 15);
        if (typeof callBack === 'function') {
            callBack();
        }
    }

    window.myAnimate = myAnimate;

    function toJson(str) {
        return 'JSON' in window ? JSON.parse(str) : eval('(' + str + ')');
    }

    return {
        toJson: toJson
    }
})();
