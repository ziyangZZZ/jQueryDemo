// console.log('$',$());
// console.log('name',$('[name = show_hide]'));

$(function () {
    showHide();

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
})