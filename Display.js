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
})