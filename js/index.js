/////////////////////////////////////////////////////////////////////////header样式
(function () {
    //获取页面元素
    var oHeader = document.getElementsByTagName('header')[0];
    var oHeaderSearch = oHeader.getElementsByClassName('header_search')[0];
    var oHeaderSearchI = oHeaderSearch.getElementsByTagName('i')[0];
    var oHeaderHeaderNav = oHeader.getElementsByClassName('header_nav')[0];
    var oHeaderHeaderNavLi = oHeaderHeaderNav.getElementsByTagName('li');
    var oHeaderOpt = oHeader.getElementsByClassName('header_opt')[0];
    var oHeaderOptD = oHeaderOpt.getElementsByTagName('div');
    var oHeaderSubnav = oHeader.getElementsByClassName('header_subnav')[0];
    var oHeaderSubnavLi = oHeaderSubnav.getElementsByTagName('li');
    var oHeaderSearchUl = oHeaderSearch.getElementsByTagName('ul')[0];
    var oHeaderSearchLis = oHeaderSearchUl.getElementsByTagName('li');
    var oDeleteRecord = document.getElementById('deleteRecord');
    var oHeaderSearchInput = oHeaderSearch.getElementsByTagName('input')[0];
    var oFilter = document.getElementsByClassName('filter')[0];
    var clintW = document.documentElement.clientWidth;
    var clintH = document.documentElement.clientHeight;
    var oHeaderOptPopup = oHeader.getElementsByClassName('loginPopup')[0];
    var oClosePopup = document.getElementById('closePopup');
    var loginPopupBomRight = oHeaderOptPopup.getElementsByClassName('loginPopup_bom_right')[0];
    var loginPopupBomRightSWitch = loginPopupBomRight.getElementsByClassName('separate')[0];
    var loginPopupCon1 = oHeaderOptPopup.getElementsByClassName('loginPopup_con')[0];
    var loginPopupCon2 = oHeaderOptPopup.getElementsByClassName('loginPopup_con')[1];
    var autoLogin = document.getElementById('autoLogin');//下次自动登录
    var scanCode = document.getElementById('scanCode');//移动二维码
    var invalid = document.getElementById('invalid');//失效点击刷新
    var scan = document.getElementById('scan');//滑动二维码显示的img
    var inputs = loginPopupCon2.getElementsByTagName('input');
    var parInputs = loginPopupCon2.getElementsByClassName('input');


    hover();
    function hover() {
        oHeaderSearchI.onmouseover = function () {
            this.style.backgroundPosition = '0 -60px';
        };
        oHeaderSearchI.onmouseout = function () {
            this.style.backgroundPosition = '0 -40px';
        };
        for (var i = 1; i < oHeaderHeaderNavLi.length; i++) {
            oHeaderHeaderNavLi[i].onmouseover = function () {
                this.className += ' change-font';
            };
            oHeaderHeaderNavLi[i].onmouseout = function () {
                this.className = '';
            };
        }
        oHeaderOptD[0].onmouseover = function () {
            this.className += ' change-font';
        };
        oHeaderOptD[0].onmouseout = function () {
            this.className = 'login';
        };
        oHeaderOptD[1].onmouseover = function () {
            this.className += ' num1c';
        };
        oHeaderOptD[1].onmouseout = function () {
            this.className = 'num1';
        };
        oHeaderOptD[2].onmouseover = function () {
            this.className += ' num2c';
        };
        oHeaderOptD[2].onmouseout = function () {
            this.className = 'num2';
        };
        for (var x = 1; x < oHeaderSubnavLi.length; x++) {
            oHeaderSubnavLi[x].onmouseover = function () {
                this.className += ' change-font';
            };
            oHeaderSubnavLi[x].onmouseout = function () {
                this.className = '';
            };
        }
        for (var l = 0; l < oHeaderSearchLis.length - 1; l++) {
            oHeaderSearchLis[l].onmouseover = function () {
                this.className += ' change';
            };
            oHeaderSearchLis[l].onmouseout = function () {
                this.className = '';
            };
        }
        oDeleteRecord.onmouseover = function () {
            this.style.backgroundPosition = '100px -240px';
        };
        oDeleteRecord.onmouseout = function () {
            this.style.backgroundPosition = '100px -220px';
        };
    }//标题栏滑动样式
    focus();
    function focus() {
        oHeaderSearchInput.onfocus = function () {
            oHeaderSearchUl.style.display = 'block';
            myAnimate({
                curEle: oHeaderSearchUl,
                change: {
                    height: 240
                },
                time: 200
            })
        };
        oHeaderSearchInput.onblur = function () {
            var timer0 = setTimeout(function () {
                myAnimate({
                    curEle: oHeaderSearchUl,
                    change: {
                        height: 0
                    },
                    time: 300,
                    callBack: hiddenInput
                });
            }, 500);
            // clearTimeout(timer0);
            function hiddenInput() {
                var timer = setTimeout(function () {
                    oHeaderSearchUl.style.display = 'none';
                    clearTimeout(this);
                }, 315);
                // clearTimeout(timer)
            }
        };


    }//搜索栏光标事件
    login();
    function login() {
        var timer1;
        for (var t = 0; t < oHeaderOptD.length; t++) {//点击登录
            oHeaderOptD[t].onclick = function () {
                oFilter.style.display = 'block';
                oHeaderOptPopup.style.display = 'block';
                oHeaderOptPopup.style.top = clintH / 2 + 'px';
                oHeaderOptPopup.style.left = clintW / 2 + 'px';
                timer1 = setTimeout(function () {
                    invalid.style.display = 'block';
                }, 5000);//二维码失效
                refresh();//二维码刷新
                input_aperture();//input点击出现光圈
            }
        }

        oClosePopup.onclick = function () {//关闭登录
            oFilter.style.display = 'none';
            oHeaderOptPopup.style.display = 'none';
            loginPopupCon1.style.display = 'block';
            loginPopupCon2.style.display = 'none';
            loginPopupBomRightSWitch.innerHTML = "账号密码登录";
            invalid.style.display = 'none';//二维码重置
            clearInterval(timer1);//清除定时器
            clearInterval(timer2);//清除定时器
            clearInterval(timer3);//清除定时器
            loginPopupBomRightSWitch.href = 'javascript:;';//重置账号密码登录input
        };
        oClosePopup.onmouseover = function () {
            oClosePopup.style.color = '#31c27c';
        };
        oClosePopup.onmouseout = function () {
            oClosePopup.style.color = '#9E9E9E';
        };

        var timer3;//延迟变更链接
        loginPopupBomRightSWitch.onclick = function () {//点击忘了密码
            loginPopupCon1.style.display = 'none';
            loginPopupCon2.style.display = 'block';
            this.innerHTML = "忘了密码？";
            timer3 = setTimeout(function () {
                loginPopupBomRightSWitch.href = 'http://support.qq.com/write.shtml?guest=1&fid=713&SSTAG=hailunna';
            }, 100);//变更链接
        };

        auto_login();//自动登录input框
        function auto_login() {
            autoLogin.step = 0;
            autoLogin.onclick = function () {
                this.step++;
                this.innerHTML = this.step % 2 === 1 ? '' : '√';
            }
        }

        scanCode_pop();//二维码移入弹出
        var timer2;//延迟清除图片
        function scanCode_pop() {
            scanCode.onmouseover = function () {
                scan.style.display = 'block';
                myAnimate({
                    curEle: scanCode,
                    change: ({
                        marginLeft: -150
                    }),
                    time: 300
                });
                clearInterval(timer1);
                myAnimate({
                    curEle: scan,
                    change: ({
                        opacity: 1
                    }),
                    time: 500
                });
            };

            scanCode.onmouseout = function () {
                myAnimate({
                    curEle: scanCode,
                    change: ({
                        marginLeft: 0
                    }),
                    time: 300
                });
                timer1 = setTimeout(function () {
                    invalid.style.display = 'block';
                }, 5000);//二维码失效
                myAnimate({
                    curEle: scan,
                    change: ({
                        opacity: 0
                    }),
                    time: 100
                });
                timer2 = setTimeout(function () {
                    scan.style.display = 'none';
                }, 115);
            }
        }

        function refresh() {//二维码刷新
            invalid.onclick = function () {
                console.log(this);
                invalid.style.display = 'none';
                timer1 = setTimeout(function () {
                    invalid.style.display = 'block';
                }, 5000);//二维码失效
            }
        }

        function input_aperture() {//input 点击出现光圈
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].ind = i;
                inputs[i].onfocus = function () {
                    parInputs[this.ind].style.borderColor = '#66F7FB'
                };
                inputs[i].onblur = function () {
                    parInputs[this.ind].style.borderColor = '#C9C9C9'
                }
            }
        }
    }//登录事件


    var con = document.getElementsByClassName('content')[0];
    var mv = document.getElementById('mv');
    var mvPage = document.getElementById('mvPage');
    var homepage = document.getElementById('homepage');
    MV();
    function MV() {
        changeMv();
        function changeMv() {//首页切换mv
            mv.onclick = function () {
                con.style.display = 'none';
                mvPage.style.display = 'block';
                mv.style.color = '#31C27C';
                homepage.style.color = '#333';

            };
            homepage.onclick = function () {
                mvPage.style.display = 'none';
                con.style.display = 'block';
                mv.style.color = '#333';
                homepage.style.color = '#31C27C';
            }
        }

        function getData(callBack) {
            var xhr = new XMLHttpRequest;
            xhr.open("GET", "./data/mvData.txt?_=" + Math.random(), true);
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
                    var data = utils.toJson(this.responseText);
                    data && data.length ? (typeof callBack === 'function' ? callBack(data) : null) : null;
                }
            };
            xhr.send(null);
        }

        var mv_list = document.getElementsByClassName('mv_list')[0];
        var mv_show = mv_list.getElementsByClassName('show');
        var play = mv_list.getElementsByClassName('play');
        getData(bindData);
        function bindData(data) {
            var liStr = '';
            for (var i = 0; i < data.length; i++) {
                var cur = data[i];
                liStr += '<li><div class="show"><a href=' + cur.url1 + '><img src=' + cur.img + '></a><a href=' + cur.url1 + ' class="play"></a></div><p><a href=' + cur.url1 + '>' + cur.title + '</a></p><span class="turn"><a href=' + cur.url2 + '>' + cur.content + '</a></span><i></i><span class="num">' + cur.hot + '</span><span class="date">' + cur.time + '</span></li>'

            }
            mv_list.innerHTML = liStr;
            hovershow();
        }

        function hovershow() {
            for (var i = 0; i < mv_show.length; i++) {
                mv_show[i].ind = i;
                mv_show[i].onmouseenter = function () {
                    play[this.ind].style.display = 'block';
                    myAnimate({
                        curEle: play[this.ind],
                        change: {
                            opacity: 1,
                            height: 70,
                            width: 70,
                            top: 28,
                            left: 77
                        },
                        time: 300
                    });
                };
                mv_show[i].onmouseleave = function () {
                    var that = this;
                    myAnimate({
                        curEle: play[this.ind],
                        change: {
                            opacity: 0,
                            height: 40,
                            width: 40,
                            top: 43,
                            left: 92
                        },
                        time: 300
                    });
                    var timer = setTimeout(function () {
                        play[that.ind].style.display = 'none'
                    }, 320);
                    clearTimeout(timer);
                }
            }
        }

        var mv_left = document.getElementsByClassName('mv_left')[0];
        var mv_right = document.getElementsByClassName('mv_right')[0];
        moveMv();
        function moveMv() {
            var previous = null;
            var step = 0;
            mv_left.onclick = function () {
                var now = +new Date();
                var atleast = 800;
                if (!previous) {
                    previous = now;
                    mv_L();
                }
                if (atleast && now - previous > atleast) {
                    mv_L();
                    // 重置上一次开始时间为本次结束时间
                    previous = now;
                }
            };
            mv_right.onclick = function () {

                var now = +new Date();
                var atleast = 800;
                if (!previous) {
                    previous = now;
                    mv_R();
                }
                if (atleast && now - previous > atleast) {
                    mv_R();
                    // 重置上一次开始时间为本次结束时间
                    previous = now;
                }
            };
            function mv_R() {
                step++;
                step === 4 ? step = 0 : null;
                myAnimate({
                    curEle: mv_list,
                    change: {
                        left: step * -1220
                    },
                    time: 300
                })
            }

            function mv_L() {
                step--;
                step === -1 ? step = 3 : null;
                myAnimate({
                    curEle: mv_list,
                    change: {
                        left: step * -1220
                    },
                    time: 300
                })
            }

        }
    }//mv页事件


})();


/////////////////////////////////////////////////////////////////content1样式


(function () {
    var con = document.getElementsByClassName('content1')[0];
    var oCase = document.getElementById('case1');
    var oLis = oCase.getElementsByTagName('li');
    var length;
    var oImgs = oCase.getElementsByTagName('img');
    var wid = parseFloat(window.getComputedStyle(oCase, null)['width']);
    var oLeft = con.getElementsByClassName('content1-left')[0];
    var oRight = con.getElementsByClassName('content1-right')[0];
    var oBtn = con.getElementsByClassName('btn')[0];
    var select = oBtn.getElementsByTagName('li');
    var oSwitch = con.getElementsByClassName('switch');
    var change = con.getElementsByClassName('change')[0];
    var son1 = change.getElementsByClassName('son')[0];
    var son2 = change.getElementsByClassName('son')[1];
    var main = con.getElementsByClassName('main')[0];
    var tops = oCase.getElementsByClassName('top');
    var boms = oCase.getElementsByClassName('bom');
    var news = oCase.getElementsByClassName('new');
    var plays = oCase.getElementsByClassName('play');
    var ification = document.getElementById('ification');
    var oa = ification.getElementsByTagName('a');

    var getData = function (callBack, url) {
        var xhr = new XMLHttpRequest;
        typeof url === 'undefined' ? url = './data/data1.txt?_=' : null;
        xhr.open('GET', url + Math.random(), true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
                var data = utils.toJson(this.responseText);
                data && data.length ? (typeof callBack === 'function' ? callBack(data) : null) : null;
            }
        };
        xhr.send(null);
    };
    getData(bindData);
    function bindData(data) {
        console.log(data);
        length = data.length + 4;
        var str = '';
        for (var i = 0; i < data.length; i++) {
            str += '<li>';
            str += '<div class="top"><a href=' + data[i].url1 + ' ><img data-src=' + data[i].img + '></a><a  href=' + data[i].url2 + ' class="play"></a></div>';
            str += '<div class="bom"><p><a href="javascript:;">' + data[i].title + '</a><i class="new"></i></p><span><a href="javascript:;">' + data[i].content + '</a></span>';
            str += '</li>';
        }
        for (var x = 0; x < 4; x++) {
            str += '<li>';
            str += '<div class="top"><a href=' + data[x].url1 + '><img data-src=' + data[x].img + '></a><a  href=' + data[x].url2 + ' class="play"></a></div>';
            str += '<div class="bom"><p><a href="javascript:;">' + data[x].title + '</a><i class="new"></i></p><span><a href="javascript:;">' + data[x].content + '</a></span>';
            str += '</li>';
        }
        oCase.innerHTML = str;
        oCase.style.width = length * parseFloat(window.getComputedStyle(oLis[0], null)['width']) + 'px';

        delayImg();
        clickFocus();
        switchAcross();//鼠标滑过显示切换按钮
        moveLis();//滑入li底部变绿
        changeData();
    }

    var timer;

    function delayImg() {

        for (var i = 0; i < oImgs.length; i++) {
            (function (n) {
                var imgSrc;
                imgSrc = oImgs[n].getAttribute('data-src');
                var temp = new Image;
                temp.src = imgSrc;
                temp.onload = function () {
                    oImgs[n].src = imgSrc;
                }
            })(i);
        }
        oCase.style.left = 0;
        //timer = setInterval(autoMove(0), 3000);
        autoMove(0);
    }

    var step = 0;

    function autoMove(ind) {
        step++;
        typeof ind != 'undefined' ? step = ind : null;
        step === 5 ? (step = 1, oCase.style.left = 0) : null;
        myAnimate({
            curEle: oCase,
            change: {
                left: step * -wid
            },
            time: 500
        });
        changeFocus(step);
    }

    function changeFocus(step) {
        step === 4 ? step = 0 : null;
        for (var i = 0; i < select.length; i++) {
            select[i].className = i === step ? 'selected' : '';
        }
    }

    // oCase.onmouseover = function () {
    //     //clearInterval(timer);
    //
    // };
    // oCase.onmouseout = function () {
    //     //timer = setInterval(autoMove, 3000);
    // };
    var previous = null;
    oRight.onclick = function () {
        var now = +new Date();
        var atleast = 800;
        if (!previous) {
            previous = now;
            autoMove();
        }
        if (atleast && now - previous > atleast) {
            autoMove();
            // 重置上一次开始时间为本次结束时间
            previous = now;
        }
    };
    oLeft.onclick = function () {
        var now = +new Date();
        var atleast = 800;
        if (!previous) {
            previous = now;
            autoMoveL();
        }
        if (atleast && now - previous > atleast) {
            autoMoveL();
            // 重置上一次开始时间为本次结束时间
            previous = now;
        }

    };
    function autoMoveL() {
        step--;
        step === -1 ? (step = 3, oCase.style.left = -wid * (step + 1) + 'px') : null;
        myAnimate({
            curEle: oCase,
            change: {
                left: step * -wid
            },
            time: 500
        });
        changeFocus(step);
    }

    // oRight.onmouseover = oLeft.onmouseover = oBtn.onmouseover = function () {
    //     //clearInterval(timer);
    // };
    // oRight.onmouseout = oLeft.onmouseout = oBtn.onmouseout = function () {
    //     //timer = setInterval(autoMove, 3000);
    // };
    function clickFocus() {
        for (var i = 0; i < select.length; i++) {
            select[i].ind = i;
            select[i].onclick = function () {
                autoMove(this.ind);
            }
        }
    }


    function switchAcross() {
        main.onmouseenter = function (e) {
            for (var i = 0; i < oSwitch.length; i++) {
                oSwitch[i].style.display = 'block';
                myAnimate({
                    curEle: oSwitch[i],
                    change: {
                        width: 72,
                        opacity: 1
                    },
                    time: 250
                });
                oSwitch[i].style.backgroundColor = 'rgba(153, 153, 153, 0.4)';//变灰
            }
        };
        son1.onmouseenter = function () {
            oSwitch[0].style.display = 'block';
            myAnimate({
                curEle: oSwitch[0],
                change: {
                    width: 80,//80
                    opacity: 1
                },
                time: 250
            });
            oSwitch[0].style.backgroundColor = '#31c27c';
            oSwitch[1].style.display = 'block';
            myAnimate({
                curEle: oSwitch[1],
                change: {
                    width: 72,
                    opacity: 1
                },
                time: 250
            });
            oSwitch[1].style.backgroundColor = 'rgba(153, 153, 153, 0.4)';//变灰
        };
        son2.onmouseenter = function (e) {
            e = window.event || e;
            oSwitch[1].style.display = 'block';
            myAnimate({
                curEle: oSwitch[1],
                change: {
                    width: 80,//80
                    opacity: 1
                },
                time: 250
            });
            oSwitch[1].style.backgroundColor = '#31c27c';
            oSwitch[0].style.display = 'block';
            myAnimate({
                curEle: oSwitch[0],
                change: {
                    width: 72,
                    opacity: 1
                },
                time: 250
            });
            oSwitch[0].style.backgroundColor = 'rgba(153, 153, 153, 0.4)';//变灰
        };

        con.onmouseleave = function () {
            for (var i = 0; i < oSwitch.length; i++) {
                myAnimate({
                    curEle: oSwitch[i],
                    change: {
                        width: 0,
                        opacity: 0
                    },
                    time: 250
                });
                var that = oSwitch[i];
                var timer = setInterval(function () {
                    that.style.display = 'none';
                }, 300);
                clearInterval(timer);
            }
        };
    }

    function moveLis() {
        for (var i = 0; i < oLis.length; i++) {
            oLis[i].ind = i;
            oLis[i].onmouseover = function () {
                boms[this.ind].style.backgroundColor = '#31c27c';
                myAnimate({
                    curEle: news[this.ind],
                    change: {
                        opacity: 1
                    },
                    time: 250
                });
            };
            oLis[i].onmouseout = function () {
                boms[this.ind].style.backgroundColor = 'rgba(0,0,0,.6)';
                myAnimate({
                    curEle: news[this.ind],
                    change: {
                        opacity: 0
                    },
                    time: 250
                });
            }
        }

        for (var x = 0; x < tops.length; x++) {
            tops[x].ind = x;
            tops[x].onmouseenter = function () {
                plays[this.ind].style.display = 'block';
                myAnimate({
                    curEle: plays[this.ind],
                    change: {
                        opacity: 1,
                        height: 70,
                        width: 70,
                        top: 115,
                        left: 115
                    },
                    time: 300
                });

                myAnimate({
                    curEle: oImgs[this.ind],
                    change: {
                        height: 320,
                        width: 320,
                        marginTop: -10,
                        marginLeft: -10
                    },
                    time: 300
                });
            };
            tops[x].onmouseleave = function () {
                var that = this;

                myAnimate({
                    curEle: plays[this.ind],
                    change: {
                        opacity: 0,
                        height: 40,
                        width: 40,
                        top: 130,
                        left: 130
                    },
                    time: 300
                });
                var timer = setTimeout(function () {
                    plays[that.ind].style.display = 'none'
                }, 320);
                clearTimeout(timer);
                myAnimate({
                    curEle: oImgs[this.ind],
                    change: {
                        height: 300,
                        width: 300,
                        marginTop: 0,
                        marginLeft: 0
                    },
                    time: 300
                });
            }
        }
    }

    var url = ['./data/data1.txt?_=', './data/data2.txt?_=', './data/data3.txt?_=', './data/data4.txt?_=', './data/data5.txt?_='];


    function changeData() {
        for (var i = 0; i < 5; i++) {
            oa[i].ind = i;
            oa[i].onclick = function () {
                for (var i = 0; i < 5; i++) {
                    oa[i].style.opacity = '0.5'
                }
                this.style.opacity = '1';
                getData(bindData, url[this.ind]);
            }
        }


    }

})();
//////////////////////////////////////////////////////////////////////////content2
(function () {

})();

var con2 = document.getElementsByClassName('content2')[0];
var son1 = con2.getElementsByClassName('son1')[0];
var son2 = con2.getElementsByClassName('son2')[0];
var main = con2.getElementsByClassName('main')[0];
var oSwitch = con2.getElementsByClassName('switch');
var oUl = con2.getElementsByClassName('container')[0];
var oLs = oUl.getElementsByTagName('li');
var btn = main.getElementsByClassName('btn')[0];
var oBtnLis = btn.getElementsByTagName('li');
var length;
switchAcross();
function switchAcross() {
    son1.onmouseenter = function () {
        oSwitch[0].style.display = 'block';
        myAnimate({
            curEle: oSwitch[0],
            change: {
                width: 80,//80
                opacity: 1
            },
            time: 250
        });
        oSwitch[0].style.backgroundColor = '#31c27c';
        oSwitch[1].style.display = 'block';
        myAnimate({
            curEle: oSwitch[1],
            change: {
                width: 72,
                opacity: 1
            },
            time: 250
        });
        oSwitch[1].style.backgroundColor = 'rgba(153, 153, 153, 0.4)';//变灰
    };
    son2.onmouseenter = function (e) {
        e = window.event || e;
        oSwitch[1].style.display = 'block';
        myAnimate({
            curEle: oSwitch[1],
            change: {
                width: 80,//80
                opacity: 1
            },
            time: 250
        });
        oSwitch[1].style.backgroundColor = '#31c27c';
        oSwitch[0].style.display = 'block';
        myAnimate({
            curEle: oSwitch[0],
            change: {
                width: 72,
                opacity: 1
            },
            time: 250
        });
        oSwitch[0].style.backgroundColor = 'rgba(153, 153, 153, 0.4)';//变灰
    };

    main.onmouseenter = function (e) {
        for (var i = 0; i < oSwitch.length; i++) {
            oSwitch[i].style.display = 'block';
            myAnimate({
                curEle: oSwitch[i],
                change: {
                    width: 72,
                    opacity: 1
                },
                time: 250
            });
            oSwitch[i].style.backgroundColor = 'rgba(153, 153, 153, 0.4)';//变灰
        }
    };
    con2.onmouseleave = function () {
        for (var i = 0; i < oSwitch.length; i++) {
            myAnimate({
                curEle: oSwitch[i],
                change: {
                    width: 0,
                    opacity: 0
                },
                time: 250
            });
            var that = oSwitch[i];
            var timer = setInterval(function () {
                that.style.display = 'none';
            }, 300);
            clearInterval(timer);
        }
    };
}

var getData = function (callBack) {
    var xhr = new XMLHttpRequest;
    xhr.open('GET', './data/recommend.txt?_=' + Math.random(), true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
            var data = utils.toJson(this.responseText);
            data && data.length ? (typeof callBack === 'function' ? callBack(data) : null) : null;
        }
    };
    xhr.send(null);
};
getData(bindData);

function bindData(data) {
    length = data.length;
    var liStr = '';
    // for (var x = 5; x < data.length; x++) {
    //     var cur = data[x];
    //     liStr += '<li><a href=' + cur.url1 + '><img src=' + cur.img + '></a></li>'
    // }
    for (var i = 0; i < data.length; i++) {
        cur = data[i];
        liStr += '<li><a href=' + cur.url1 + '><img src=' + cur.img + '></a></li>'
    }
    // for (var n = 0; n < 3; n++) {
    //     cur = data[n];
    //     liStr += '<li><a href=' + cur.url1 + '><img src=' + cur.img + '></a></li>'
    // }
    oUl.innerHTML = liStr;
    step1 = 0;
    step2 = 1;
    step3 = 2;
    step4 = 7;
    step5 = 6;
    oLs[7].className = 'selectedR';
    oLs[0].className = 'selected';
    oLs[1].className = 'selectedL';
    changeRecommend();//轮播推荐
    slideRecommend();//滑入滑出推荐
    clickRecommend();//点击切换精彩内容
    moveFocus();//轮播光标跟随
    changeFocus();//点击焦点

}
//var step = [1, 2, 3, 4, 5, 6, 7, 8];
var timer;

function changeRecommend() {
    timer = setInterval(function () {
        change();
    }, 3000);
}

var step1;
var step2;
var step3;
var step4;
var step5;


function change() {
    a();
    b();
    c();
    d();
    step5 === 8 ? step5 = 0 : null;
    function a() {
        oLs[step1].className = 'selected';
        setTimeout(function () {
            var num = step1 - 1;
            num === -1 ? num = 7 : null;
            oLs[num].style.zIndex = '0';
        }, 100);
        myAnimate({
            curEle: oLs[step1],
            change: {
                left: 1200,
                width: 600,
                height: 240,
                top: 30,
                opacity: 0.7
            },
            time: 200
        });
    }

    function b() {
        oLs[step2].className = 'selectedL';
        setTimeout(function () {
            var num = step2 - 1;
            num === -1 ? num = 7 : null;
            oLs[num].style.zIndex = '1';
        }, 100);
        myAnimate({
            curEle: oLs[step2],
            change: {
                left: 1425,
                width: 750,
                height: 300,
                top: 0,
                opacity: 1
            },
            time: 200
        });

    }

    function c() {
        oLs[step3].className = 'selectedLL';
        oLs[step3].style.left = '2400px';
        oLs[step3].style.zIndex = '0';
        myAnimate({
            curEle: oLs[step3],
            change: {
                left: 1800,
                opacity: 0.7
            },
            time: 200
        });
    }

    function d() {
        oLs[step4].className = 'selectedR';
        oLs[step4].style.zIndex = '0';
        myAnimate({
            curEle: oLs[step4],
            change: {
                left: 600,
                opacity: 0
            },
            time: 200
        });

    }

    step1++;
    step1 === 8 ? step1 = 0 : null;
    step2++;
    step2 === 8 ? step2 = 0 : null;
    step3++;
    step3 === 8 ? step3 = 0 : null;
    step4++;
    step4 === 8 ? step4 = 0 : null;
    step5++;
    step5 === 8 ? step5 = 0 : null;
    moveFocus();
}

function changeL() {
    a();
    b();
    c();
    d();
    function a() {
        oLs[step1].className = 'selected';
        setTimeout(function () {
            var num = step1 + 1;
            num === 8 ? num = 0 : null;
            oLs[num].style.zIndex = '0';
        }, 100);
        myAnimate({
            curEle: oLs[step1],
            change: {
                left: 1800,
                width: 600,
                height: 240,
                top: 30,
                opacity: 0.7
            },
            time: 200
        });
    }

    function b() {
        oLs[step2].className = 'selectedL';
        oLs[step2].style.left = '1800px';
        oLs[step2].style.zIndex = '0';
        myAnimate({
            curEle: oLs[step2],
            change: {
                left: 2400,
                opacity: 0.7
            },
            time: 200
        });

    }

    function c() {
        oLs[step4].className = 'selectedR';
        setTimeout(function () {
            var num = step4 + 1;
            num === 8 ? num = 0 : null;
            oLs[num].style.zIndex = '1';
        }, 100);
        myAnimate({
            curEle: oLs[step4],
            change: {
                left: 1425,
                width: 750,
                height: 300,
                top: 0,
                opacity: 1
            },
            time: 200
        });

    }

    function d() {
        oLs[step5].style.left = '600px';
        oLs[step5].style.opacity = 0;
        oLs[step5].style.zIndex = '0';
        myAnimate({
            curEle: oLs[step5],
            change: {
                left: 1200,
                opacity: 0.7
            },
            time: 200
        });

    }

    // console.log(previous)

    step1--;
    step1 === -1 ? step1 = 7 : null;
    step2--;
    step2 === -1 ? step2 = 7 : null;
    step3--;
    step3 === -1 ? step3 = 7 : null;
    step4--;
    step4 === -1 ? step4 = 7 : null;
    step5--;
    step5 === -1 ? step5 = 7 : null;
    moveFocus()

}

function slideRecommend() {
    for (var i = 0; i < oLs.length; i++) {
        oLs[i].onmouseover = oSwitch[0].onmouseover = oSwitch[1].onmouseover = function () {
            clearInterval(timer);
        };
        oLs[i].onmouseout = oSwitch[0].onmouseout = oSwitch[1].onmouseout = function () {
            timer = setInterval(function () {
                change();
            }, 3000);
        }
    }
}


function clickRecommend() {
    var previous = null;
    oSwitch[0].onclick = function () {

        var now = +new Date();
        var atleast = 350;
        if (!previous) {
            previous = now;
            changeL();
        }
        if (atleast && now - previous > atleast) {
            changeL();
            // 重置上一次开始时间为本次结束时间
            previous = now;
        }
    };


    oSwitch[1].onclick = function () {
        var now = +new Date();
        var atleast = 350;
        if (!previous) {
            previous = now;
            change();
        }
        if (atleast && now - previous > atleast) {
            change();
            // 重置上一次开始时间为本次结束时间
            previous = now;
        }
    }
}
function moveFocus() {
    for (var i = 0; i < oBtnLis.length; i++) {
        oBtnLis[i].className = '';
        oBtnLis[step1].className = 'selected';
        oBtnLis[i].ind = i;
        oBtnLis[i].onmouseover = function () {
            clearInterval(timer);
        };
        oBtnLis[i].onmouseout = function () {
            timer = setInterval(function () {
                change();
            }, 3000);
        };
    }
}
function changeFocus() {
    for (var i = 0; i < oBtnLis.length; i++) {
        oBtnLis[i].index = i;
        oBtnLis[i].onclick = function () {
            var n = this.index;
            step1 = n;
            step2 = n + 1 === 8 ? 0 : n + 1;
            step3 = n + 2 === 9 ? 1 : n + 2 === 8 ? 0 : n + 2;
            step4 = n - 1 === -1 ? 7 : n - 1;
            step5 = n - 2 === -2 ? 6 : n - 2 === -1 ? 7 : n - 2;
            for (var i = 0; i < oLs.length; i++) {
                if (i != step1 && i != step2 && i != step3 && i != step4 && i != step5) {
                    oLs[i].className = '';
                    oLs[i].style.zIndex = -1;
                    oLs[i].style.opacity = "0";
                }
            }
            oLs[step1].style.zIndex = 3;
            oLs[step2].style.zIndex = 2;
            oLs[step4].style.zIndex = 2;
            oLs[step3].style.zIndex = 1;
            oLs[step5].style.zIndex = 1;
            oLs[step3].style.opacity = 0.7;
            oLs[step5].style.opacity = 0.7;
            a();
            b();
            c();
            d();
            e();
            function a() {
                myAnimate({
                    curEle: oLs[step1],
                    change: {
                        left: 1425,
                        width: 750,
                        height: 300,
                        top: 0,
                        opacity: 1
                    },
                    time: 200
                });
            }

            function b() {
                myAnimate({
                    curEle: oLs[step2],
                    change: {
                        left: 1800,
                        width: 600,
                        height: 240,
                        opacity: 0.7,
                        top: 30
                    },
                    time: 200
                });
            }

            function c() {
                myAnimate({
                    curEle: oLs[step4],
                    change: {
                        left: 1200,
                        width: 600,
                        height: 240,
                        top: 30,
                        opacity: 0.7
                    },
                    time: 200
                });
            }

            function d() {
                myAnimate({
                    curEle: oLs[step3],
                    change: {
                        left: 2400,
                        width: 600,
                        height: 240,
                        top: 30
                    },
                    time: 200
                });
            }

            function e() {
                myAnimate({
                    curEle: oLs[step5],
                    change: {
                        left: 600,
                        width: 600,
                        height: 240,
                        top: 30
                    },
                    time: 200
                });
            }

            moveFocus()
        };
    }
}
//////////////////////////////////////////////////////////////////////////content3

(function () {
    var con = document.getElementsByClassName('content3')[0];
    var plays = con.getElementsByClassName('play');
    var lines = con.getElementsByClassName('con_line');
    var Lis = con.getElementsByTagName('li');
    changePlay();//滑入li事件
    function changePlay() {

        for (var i = 0; i < Lis.length; i++) {
            Lis[i].ind = i;
            Lis[i].onmouseenter = function () {//滑入li
                plays[this.ind].style.display = 'block';
                //让play播放图标出现
                myAnimate({
                    curEle: plays[this.ind],
                    change: {
                        opacity: 1,
                        height: 70,
                        width: 70,
                        top: 180,
                        left: 115
                    },
                    time: 300
                });
                //让中心横线消失
                lines[this.ind].style.display = 'none';
                //当前li的背景图片放大
                // console.log(Lis[this.ind].style.backgroundSize);
                // myAnimate({
                //     curEle: Lis[this.ind],
                //     change: {
                //         backgroundSizeX:1360,
                //         backgroundSizeY:607
                //     },
                //     time: 300
                // });
            };
            Lis[i].onmouseleave = function () {//滑出li
                var that = this;
                //让play播放图标隐藏
                myAnimate({
                    curEle: plays[this.ind],
                    change: {
                        opacity: 0,
                        height: 40,
                        width: 40,
                        top: 195,
                        left: 130
                    },
                    time: 300
                });
                //让中心横线出现
                var timer = setTimeout(function () {
                    plays[that.ind].style.display = 'none'
                }, 320);
                clearTimeout(timer);
                lines[this.ind].style.display = 'block'
            }
        }
    }
})();
//////////////////////////////////////////////////////////////////////////content4
(function () {
    var con = document.getElementsByClassName('content4')[0];
    var oCase = document.getElementById('case2');
    var oLis = oCase.getElementsByTagName('li');
    var oImgs = oCase.getElementsByTagName('img');
    var wid = parseFloat(window.getComputedStyle(oCase, null)['width']);
    var oLeft = con.getElementsByClassName('content1-left')[0];
    var oRight = con.getElementsByClassName('content1-right')[0];
    var oBtn = con.getElementsByClassName('btn')[0];
    var select = oBtn.getElementsByTagName('li');
    var oSwitch = con.getElementsByClassName('switch');
    var change = con.getElementsByClassName('change')[0];
    var son1 = change.getElementsByClassName('son')[0];
    var son2 = change.getElementsByClassName('son')[1];
    var main = con.getElementsByClassName('main')[0];
    var tops = oCase.getElementsByClassName('top');
    var boms = oCase.getElementsByClassName('bom');
    var news = oCase.getElementsByClassName('new');
    var plays = oCase.getElementsByClassName('play');
    var ification = document.getElementById('ification');
    var oa = ification.getElementsByTagName('a');
    var length;

    var getData = function (callBack) {
        var xhr = new XMLHttpRequest;
        xhr.open('GET', './data/data6.txt?_=' + Math.random(), true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
                var data = utils.toJson(this.responseText);
                data && data.length ? (typeof callBack === 'function' ? callBack(data) : null) : null;
            }
        };
        xhr.send(null);
    };
    getData(bindData);
    function bindData(data) {
        length = data.length + 4;
        var str = '';
        for (var i = 0; i < data.length; i++) {
            str += '<li>';
            str += '<div class="top"><a href=' + data[i].url1 + ' ><img data-src=' + data[i].img + '></a><a  href=' + data[i].url2 + ' class="play"></a></div>';
            str += '<div class="bom"><p><a href="javascript:;">' + data[i].title + '</a><i class="new"></i></p><span><a href="javascript:;">' + data[i].content + '</a></span>';
            str += '</li>';
        }
        for (var x = 0; x < 4; x++) {
            str += '<li>';
            str += '<div class="top"><a href=' + data[x].url1 + '><img data-src=' + data[x].img + '></a><a  href=' + data[x].url2 + ' class="play"></a></div>';
            str += '<div class="bom"><p><a href="javascript:;">' + data[x].title + '</a><i class="new"></i></p><span><a href="javascript:;">' + data[x].content + '</a></span>';
            str += '</li>';
        }
        oCase.innerHTML = str;
        oCase.style.width = length * parseFloat(window.getComputedStyle(oLis[0], null)['width']) + 'px';

        delayImg();
        clickFocus();
        switchAcross();//鼠标滑过显示切换按钮
        moveLis();//滑入li底部变绿
    }

    var timer;

    function delayImg() {
        for (var i = 0; i < oImgs.length; i++) {
            (function (n) {
                var imgSrc;
                imgSrc = oImgs[n].getAttribute('data-src');
                var temp = new Image;
                temp.src = imgSrc;

                temp.onload = function () {
                    oImgs[n].src = imgSrc;
                }
            })(i);
        }
        oCase.style.left = 0;
        //timer = setInterval(autoMove(0), 3000);
        autoMove(0);
    }

    var step = 0;

    function autoMove(ind) {
        step++;
        typeof ind != 'undefined' ? step = ind : null;
        step === 4 ? (step = 1, oCase.style.left = 0) : null;
        myAnimate({
            curEle: oCase,
            change: {
                left: step * -wid
            },
            time: 500
        });
        changeFocus(step);
    }

    function changeFocus(step) {
        step === 3 ? step = 0 : null;
        for (var i = 0; i < select.length; i++) {
            select[i].className = i === step ? 'selected' : '';
        }
    }

    var previous = null;
    oRight.onclick = function () {
        var now = +new Date();
        var atleast = 800;
        if (!previous) {
            previous = now;
            autoMove();
        }
        if (atleast && now - previous > atleast) {
            autoMove();
            // 重置上一次开始时间为本次结束时间
            previous = now;
        }
    };
    oLeft.onclick = function () {
        var now = +new Date();
        var atleast = 800;
        if (!previous) {
            previous = now;
            autoMoveL();
        }
        if (atleast && now - previous > atleast) {
            autoMoveL();
            // 重置上一次开始时间为本次结束时间
            previous = now;
        }

    };
    function autoMoveL() {
        step--;
        step === -1 ? (step = 2, oCase.style.left = -wid * (step + 1) + 'px') : null;
        myAnimate({
            curEle: oCase,
            change: {
                left: step * -wid
            },
            time: 500
        });
        changeFocus(step);
    }

    function clickFocus() {
        for (var i = 0; i < select.length; i++) {
            select[i].ind = i;
            select[i].onclick = function () {
                autoMove(this.ind);
            }
        }
    }


    function switchAcross() {
        main.onmouseenter = function (e) {
            for (var i = 0; i < oSwitch.length; i++) {
                oSwitch[i].style.display = 'block';
                myAnimate({
                    curEle: oSwitch[i],
                    change: {
                        width: 72,
                        opacity: 1
                    },
                    time: 250
                });
                oSwitch[i].style.backgroundColor = 'rgba(153, 153, 153, 0.4)';//变灰
            }
        };
        son1.onmouseenter = function () {
            oSwitch[0].style.display = 'block';
            myAnimate({
                curEle: oSwitch[0],
                change: {
                    width: 80,//80
                    opacity: 1
                },
                time: 250
            });
            oSwitch[0].style.backgroundColor = '#31c27c';
            oSwitch[1].style.display = 'block';
            myAnimate({
                curEle: oSwitch[1],
                change: {
                    width: 72,
                    opacity: 1
                },
                time: 250
            });
            oSwitch[1].style.backgroundColor = 'rgba(153, 153, 153, 0.4)';//变灰
        };
        son2.onmouseenter = function (e) {
            e = window.event || e;
            oSwitch[1].style.display = 'block';
            myAnimate({
                curEle: oSwitch[1],
                change: {
                    width: 80,//80
                    opacity: 1
                },
                time: 250
            });
            oSwitch[1].style.backgroundColor = '#31c27c';
            oSwitch[0].style.display = 'block';
            myAnimate({
                curEle: oSwitch[0],
                change: {
                    width: 72,
                    opacity: 1
                },
                time: 250
            });
            oSwitch[0].style.backgroundColor = 'rgba(153, 153, 153, 0.4)';//变灰
        };


        con.onmouseleave = function () {
            for (var i = 0; i < oSwitch.length; i++) {
                myAnimate({
                    curEle: oSwitch[i],
                    change: {
                        width: 0,
                        opacity: 0
                    },
                    time: 250
                });
                var that = oSwitch[i];
                var timer = setInterval(function () {
                    that.style.display = 'none';
                }, 300);
                clearInterval(timer);
            }
        };
    }

    function moveLis() {
        for (var i = 0; i < oLis.length; i++) {
            oLis[i].ind = i;
            oLis[i].onmouseover = function () {
                boms[this.ind].style.backgroundColor = '#31c27c';
                myAnimate({
                    curEle: news[this.ind],
                    change: {
                        opacity: 1
                    },
                    time: 250
                });
            };
            oLis[i].onmouseout = function () {
                boms[this.ind].style.backgroundColor = this.ind % 2 === 0 ? '#333' : '#414141';

                myAnimate({
                    curEle: news[this.ind],
                    change: {
                        opacity: 0
                    },
                    time: 250
                });
            }
        }

        for (var x = 0; x < tops.length; x++) {
            tops[x].ind = x;
            tops[x].onmouseenter = function () {
                plays[this.ind].style.display = 'block';
                myAnimate({
                    curEle: plays[this.ind],
                    change: {
                        opacity: 1,
                        height: 70,
                        width: 70,
                        top: 115,
                        left: 115
                    },
                    time: 300
                });

                myAnimate({
                    curEle: oImgs[this.ind],
                    change: {
                        height: 320,
                        width: 320,
                        marginTop: -10,
                        marginLeft: -10
                    },
                    time: 300
                });
            };
            tops[x].onmouseleave = function () {
                var that = this;
                myAnimate({
                    curEle: plays[this.ind],
                    change: {
                        opacity: 0,
                        height: 40,
                        width: 40,
                        top: 130,
                        left: 130
                    },
                    time: 300
                });
                var timer = setTimeout(function () {
                    plays[that.ind].style.display = 'none'
                }, 320);
                clearTimeout(timer);
                myAnimate({
                    curEle: oImgs[this.ind],
                    change: {
                        height: 300,
                        width: 300,
                        marginTop: 0,
                        marginLeft: 0
                    },
                    time: 300
                });
            }
        }
    }
})();
//////////////////////////////////////////////////////////////////////////content5
(function () {
    var con = document.getElementsByClassName('content5')[0];
    var mvOpt = con.getElementsByClassName('mvOpt')[0];
    var mv_list = con.getElementsByClassName('mv_list')[0];
    var mv_show = mv_list.getElementsByClassName('show');
    var play = mv_list.getElementsByClassName('play');
    var oa = mvOpt.getElementsByTagName('a');

    var getData = function (callBack, url) {
        var xhr = new XMLHttpRequest;
        typeof url === 'undefined' ? url = './data/mvData1.txt?_=' : null;
        xhr.open('GET', url + Math.random(), true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
                var data = utils.toJson(this.responseText);
                data && data.length ? (typeof callBack === 'function' ? callBack(data) : null) : null;
            }
        };
        xhr.send(null);
    };

    getData(bindData);
    function bindData(data) {
        var liStr = '';
        for (var i = 0; i < data.length; i++) {
            var cur = data[i];
            liStr += '<li><div class="show"><a href=' + cur.url1 + '><img src=' + cur.img + '></a><a href=' + cur.url1 + ' class="play"></a></div><p><a href=' + cur.url1 + '>' + cur.title + '</a></p><span class="turn"><a href=' + cur.url2 + '>' + cur.content + '</a></span><i></i><span class="num">' + cur.hot + '</span></li>'

        }
        mv_list.innerHTML = liStr;
        hovershow();
        changeData();
    }

    function hovershow() {
        for (var i = 0; i < mv_show.length; i++) {
            mv_show[i].ind = i;
            mv_show[i].onmouseenter = function () {
                play[this.ind].style.display = 'block';
                myAnimate({
                    curEle: play[this.ind],
                    change: {
                        opacity: 1,
                        height: 70,
                        width: 70,
                        top: 50,
                        left: 115
                    },
                    time: 300
                });
            };
            mv_show[i].onmouseleave = function () {
                var that = this;
                myAnimate({
                    curEle: play[this.ind],
                    change: {
                        opacity: 0,
                        height: 30,
                        width: 30,
                        top: 70,
                        left: 135
                    },
                    time: 300
                });
                var timer = setTimeout(function () {
                    play[that.ind].style.display = 'none'
                }, 320);
                clearTimeout(timer);
            }
        }
    }

    var url = ['././data/mvData1.txt?_=', './data/data2.txt?_=', './data/data3.txt?_=', './data/data4.txt?_=', './data/data5.txt?_='];

    function changeData() {
        for (var i = 0; i < 5; i++) {
            oa[i].ind = i;
            oa[i].onclick = function () {
                for (var i = 0; i < 5; i++) {
                    oa[i].style.opacity = '0.5'
                }
                this.style.opacity = '1';
                getData(bindData, url[this.ind]);
            }
        }
    }
})();
//////////////////////////////////////////////////////////////////////////footer
(function () {
    var more = document.getElementById('more');
    var hiddenLinks = document.getElementById('hiddenLinks');
    var footer = document.getElementsByTagName('footer')[0];
    var foot_top = document.getElementsByClassName('foot_top')[0];
    //更多链接
    var moreLinks = function () {
        more.onclick = function () {
            hiddenLinks.style.display = 'block';
            this.style.display = 'none';
            foot_top.style.height = '376px';
        }
    };
    moreLinks();
})();
//////////////////////////////////////////////////////////////////////////aside
(function () {
    var scrollIcon = document.getElementById('scrollIcon');
    var sTop;
    var winH = document.documentElement.clientHeight;
    window.onscroll = function () {
        sTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (sTop > 100) {
            scrollIcon.style.display = 'block';
        } else {
            scrollIcon.style.display = 'none';
        }
    };
    scrollIcon.onclick = function () {
        document.documentElement.scrollTop =document.body.scrollTop=0;
    }
})();

