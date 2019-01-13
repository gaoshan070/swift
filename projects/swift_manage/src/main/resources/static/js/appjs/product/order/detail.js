var prefix = "/product/order";
$(function() {
    var orderId = $('#orderId').val();
    load(orderId);
});

function load(orderId) {
    $('#detailTable')
        .bootstrapTable(
            {
                url : prefix + '/orderInfo/' + orderId, // 请求数据的ajax的url
                pagination : true, // 设置为true会在底部显示分页条
                columns : [
                    {
                        field : 'name',
                        title : 'Product'
                    },
                    {
                        field : 'picture',
                        title : 'Picture',
                        formatter : function(value, row, index) {
                            return '<img onclick="zoomOut(this)" src="'+value+'" style="width:50px;height:50px;" />';
                        }
                    },
                    {
                        field : 'number',
                        title : 'Quantity'
                    },
                    {
                        field : 'nowPrice',
                        title : 'Price'
                    },
                    {
                        field : 'fee',
                        title : 'Fee'
                    },
                    {
                        field : 'total0',
                        title : 'Total',
                        align : 'center'
                    }]
            });
}

function zoomOut(e) {
    var url = $(e).attr("src");
    layer.open({
        type : 1,
        closeBtn : 0,
        shadeClose : true,
        area : ['400px', '320px'],
        content : "<img src=" + url + " />"
    });
}