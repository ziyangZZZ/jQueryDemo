$(function () {
    showHide();

    // 应用框的显示与隐藏
    function showHide() {
        $('[name = show_hide]').hover(
            function () {
                var $id = this.id + '_items'
                $('#' + $id).show();
            },
            function () {
                var $id = this.id + '_items'
                $('#' + $id).hide();
            }
        )
    }

    secondMenu();

    // 二级菜单的显示与隐藏
    function secondMenu() {
        $('#category_items>div').hover(
            function () {
                $(this).children(':last').show();
            },
            function () {
                $(this).children(':last').hide();
            }
        )
    }

    searchHelper();

    // 搜索框功能
    function searchHelper() {
        $('#txtSearch').on('keyup focus', function () {
                var txt = this.value.trim();
                if (txt) {
                    $('#search_helper').show();
                }
            })
            .blur(function () {
                $('#search_helper').hide();
            })
    }



    // 分享栏的隐藏与显示
    var close = true;
    $('#shareMore').click(function () {
        if (close) {
            $(this).parent().width('200');
            $('b').addClass('backword');
            $(this).prevAll('a:lt(2)').show();
        } else {
            $(this).parent().width('155');
            $('b').removeClass('backword');
            $(this).prevAll('a:lt(2)').hide();
        }
        close = !close;
    })

    adddress();

    // 地址栏的显示与隐藏
    function adddress() {
        $('#store_select')
            .hover(
                function () {
                    $(this).children(':gt(0)').show();
                },
                function () {
                    $(this).children(':gt(0)').hide();
                }
            )
            .children(':last').click(
                function () {
                    $('#store_select').children(':gt(0)').hide();
                }
            )
    }

    tabclick();

    // 地址栏的切换
    function tabclick() {
        $('#store_tabs>li').click(function () {
            $('#store_tabs>li').removeClass('hover');
            this.className = 'hover';
        })
    }

    minicart();

    // 迷你购物车
    function minicart() {
        $('#minicart').hover(
            function () {
                this.className = 'minicart';
                $(this).children(':last').show();
            },
            function () {
                this.className = '';
                $(this).children(':last').hide();
            }
        )
    }


    productDetail();


    //  产品介绍和详情
    function productDetail() {
        var $li = $('#product_detail>ul>li');
        var $content = $('#product_detail>ul>div:gt(0)');
        $li.click(
            function () {
                var index = $(this).index();
                $li.removeClass('current');
                this.className = 'current';
                $content.hide();
                $content.eq(index).show();
            }
        )
    }

    moveMiniImg();

    // 移动小图
    function moveMiniImg() {
        //需要的变量
        var $a = $('#preview>h1>a');
        var $backward = $a.first();
        var $forward = $a.last();
        var $ul = $('#icon_list');
        var showCount = 5;
        var imgCount = $ul.children('li').length;
        var moveCount = 0; //小图移动的次数，初始为0，向左为负，向右为正
        var liWidth = $ul.children(':first').width();

        if (imgCount > showCount) {
            // 初始化
            $forward.attr('class', 'forward');
        }
        $forward.click(
            function () {
                // 判断是否可以移动
                if (moveCount === imgCount - showCount) {
                    return;
                }
                moveCount++;
                $backward.attr('class', 'backward');
                // 判断右键是否应该成灰色
                if (moveCount === imgCount - showCount) {
                    $forward.attr('class', 'forward_disabled');
                }
                // 移动图片
                $ul.css({
                    left: -moveCount * liWidth
                })
            }
        )

        $backward.click(
            function () {
                if (moveCount === 0) {
                    return;
                }
                moveCount--;
                $forward.attr('class', 'forward');
                if (moveCount === 0) {
                    $backward.attr('class', 'backward_disabled');
                }
                $ul.css({
                    left: -moveCount * liWidth
                })
            }
        )
    }

    hoverImg();

    // 切换中图
    function hoverImg() {
        $('#icon_list>li').hover(
            function () {
                var $img = $(this).children();
                $img.addClass('hoveredThumb');
                var $src = $img.attr('src').replace('.jpg', '-m.jpg');
                $('#mediumImg').attr('src', $src);
            },
            function () {
                $(this).children().removeClass('hoveredThumb');
            }
        )
    }


    bigImg();

    // 放大镜
    function bigImg() {
        var $mediumImg = $('#mediumImg');
        var $mask = $('#mask');
        var $maskTop = $('#maskTop');
        var $l_ImgContainer = $('#largeImgContainer');
        var $loading = $('#lodading');
        var $l_Img = $('#largeImg');
        var maskWidth = $mask.width();
        var maskHeight = $mask.height();
        var maskTopWidth = $maskTop.width();
        var maksTopHeight = $maskTop.height();

        $maskTop.hover(
            function () {
                $mask.show();
                var $src = $mediumImg.attr('src').replace('-m.', '-l.');
                $l_Img.attr('src', $src);
                $l_ImgContainer.show();
                $l_Img.on('load', function () {
                    // 获得大图的尺寸
                    var largeWidth = $l_Img.width();
                    var largeHeight = $l_Img.height();
                    // 给大图的容器设置尺寸
                    $l_ImgContainer.css({
                        width:  largeWidth / 2,
                        height: largeHeight / 2
                    })
                    // 让大图显示
                    $l_Img.show();
                    $loading.hide();
                    $maskTop.mousemove(
                        function (e) {
                            //拿到它的坐标给mask重新定位
                            var left = 0;
                            var top = 0;
                            var eLeft = e.offsetX;
                            var eTop = e.offsetY;
                            // var a = maskWidth/2;
                            left = eLeft - maskWidth / 2;
                            // left >=0 && left <= maskTopWidth - maskWidth
                            top = eTop - maskHeight / 2;
                            // top >=0 && top <= maskTopHeight - maskTopHeight
                            if (left < 0) {
                                left = 0
                            } else if (left > maskTopWidth - maskWidth) {
                                left = maskTopWidth - maskWidth
                            }
                            if (top < 0) {
                                top = 0
                            } else if (top > maksTopHeight - maskHeight) {
                                top = maksTopHeight - maskHeight
                            }
                            // 让mask获得动态坐标
                            $mask.css({
                                left: left,
                                top: top
                            })
                            // 得到大图的动态坐标

                            left = -left * largeWidth / maskTopWidth;
                            top = -top * largeHeight / maksTopHeight;
                            $l_Img.css({
                                left: left,
                                top: top
                            })
                        })
                })
                //鼠标移动监听

            },
            function () {
                // 当鼠标离开时，让大图及其容器，还有小黄块隐藏
                $mask.hide();
                $l_Img.hide();
                $l_ImgContainer.hide();
            }
        )
    }
})