var prefix = "/account/consult"
$(function() {
    load();
});

function load() {
    $('#exampleTable')
        .bootstrapTable(
            {
                method : 'get', // 服务器数据的请求方式 get or post
                url : prefix + "/list", // 服务器数据的加载地址
                iconSize : 'outline',
                toolbar : '#exampleToolbar',
                striped : true, // 设置为true会有隔行变色效果
                dataType : "json", // 服务器返回的数据类型
                pagination : true, // 设置为true会在底部显示分页条
                // queryParamsType : "limit",
                // //设置为limit则会发送符合RESTFull格式的参数
                singleSelect : false, // 设置为true将禁止多选
                // contentType : "application/x-www-form-urlencoded",
                // //发送到服务器的数据编码类型
                pageSize : 10, // 如果设置了分页，每页数据条数
                pageNumber : 1, // 如果设置了分布，首页页码
                // search : true, // 是否显示搜索框
                showColumns : false, // 是否显示内容下拉框（选择显示的列）
                sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者
                // "server"
                queryParams : function(params) {
                    return {
                        // 说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
                        limit : params.limit,
                        offset : params.offset
                    };
                },
                columns : [
                    {
                        checkbox : true
                    },
                    {
                        field : 'id', // 列字段名
                        title : 'ID' // 列标题
                    },
                    {
                        field : 'name', // 列字段名
                        title : 'Name' // 列标题
                    },
                    {
                        field : 'email',
                        title : 'Email'
                    },
                    {
                        field : 'status',
                        title : 'Status',
                        align : 'center',
                        formatter : function(value, row, index) {
                            if (value == '1') {
                                return '<span class="label label-primary">Read</span>';
                            } else if (value == '0') {
                                return '<span class="label label-danger">Unread</span>';
                            }
                        }
                    },
                    {
                        field : 'subject',
                        title : 'Subject'
                    },
                    {
                        field : 'createDate',
                        title : 'Create Date'
                    },
                    {
                        title : 'Action',
                        field : 'id',
                        align : 'center',
                        formatter : function(value, row, index) {
                            var e = '<a  class="btn btn-primary btn-sm ' + s_edit_h + '" href="#" mce_href="#" title="Edit" onclick="edit(\''
                                + row.id
                                + '\')"><i class="fa fa-edit "></i></a> ';
                            var d = '<a class="btn btn-warning btn-sm ' + s_remove_h + '" href="#" title="Delete"  mce_href="#" onclick="remove(\''
                                + row.id
                                + '\')"><i class="fa fa-remove"></i></a> ';
                            return e + d;
                        }
                    } ]
            });
}
function reLoad() {
    $('#exampleTable').bootstrapTable('refresh');
}
function remove(id) {
    layer.confirm('Are you sure to delete the selected item？', {
        btn : [ 'Ok', 'Cancel' ]
    }, function() {
        $.ajax({
            url : "/account/consult/remove",
            type : "post",
            data : {
                'id' : id
            },
            success : function(r) {
                if (r.code == 0) {
                    layer.msg(r.msg);
                    reLoad();
                } else {
                    layer.msg(r.msg);
                }
            }
        });
    })
}
function edit(id) {
    layer.open({
        type : 2,
        title : 'Customer Information',
        maxmin : true,
        shadeClose : false,
        area : [ '800px', '420px' ],
        content : prefix + '/edit/' + id // iframe的url
    });
}
