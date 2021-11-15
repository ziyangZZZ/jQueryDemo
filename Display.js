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
})