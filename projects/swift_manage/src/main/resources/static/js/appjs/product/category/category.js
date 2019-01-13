var prefix = "/product/category";
$(function() {
    load();
});

function load() {
    $('#exampleTable')
        .bootstrapTreeTable(
            {
                id : 'id',
                code : 'id',
                parentCode : 'pid',
                type : "GET", // 请求数据的ajax类型
                url : prefix + '/list', // 请求数据的ajax的url
                ajaxParams : {}, // 请求数据的ajax的data属性
                expandColumn : '1', // 在哪一列上面显示展开按钮
                striped : true, // 是否各行渐变色
                bordered : true, // 是否显示边框
                expandAll : false, // 是否全部展开
                // toolbar : '#exampleToolbar',
                columns : [
                    {
                        title : 'ID',
                        field : 'id',
                        visible : false,
                        align : 'center',
                        valign : 'center',
                        width : '50px',
                        checkbox : true
                    },
                    {
                        field : 'name',
                        title : 'Name',
                        valign : 'center',
                        witth :20
                    },
                    {
                        field : 'order1',
                        title : 'Sort',
                        align : 'center',
                        valign : 'center',
                    },
                    // {
                    //     field : 'delFlag',
                    //     title : '状态',
                    //     align : 'center',
                    //     valign : 'center',
                    //     formatter : function(item, index) {
                    //         if (item.delFlag == '0') {
                    //             return '<span class="label label-danger">禁用</span>';
                    //         } else if (item.delFlag == '1') {
                    //             return '<span class="label label-primary">正常</span>';
                    //         }
                    //     }
                    // },
                    {
                        title : 'Action',
                        field : 'id',
                        align : 'center',
                        valign : 'center',
                        formatter : function(item, index) {
                            var e = '<a class="btn btn-primary btn-sm ' + s_edit_h + '" href="#" mce_href="#" title="Edit" onclick="edit(\''
                                + item.id
                                + '\')"><i class="fa fa-edit"></i></a> ';
                            var a = '<a class="btn btn-primary btn-sm ' + s_add_h + '" href="#" title="Add Subcategory"  mce_href="#" onclick="add(\''
                                + item.id
                                + '\')"><i class="fa fa-plus"></i></a> ';
                            var d = '<a class="btn btn-warning btn-sm ' + s_remove_h + '" href="#" title="Del"  mce_href="#" onclick="removeone(\''
                                + item.id
                                + '\')"><i class="fa fa-remove"></i></a> ';
                            var f = '<a class="btn btn-primary btn-sm ' + s_wholesale_h + '" href="#" title="wholesale"  mce_href="#" onclick="wholesale(\''
                                + item.id
                                + '\')"><i class="fa fa-suitcase"></i></a> ';
                            if(item.pid != 0){
                                return e + d + f;
                            } else {
                                return e + a + d;
                            }
                        }
                    } ]
            });
}
function reLoad() {
    load();
}

function wholesale(cId) {
    layer.open({
        type : 2,
        title : 'Wholesale',
        maxmin : true,
        shadeClose : false, // 点击遮罩关闭层
        area : [ '800px', '520px' ],
        content : prefix + '/wholesale/' + cId
    });
}
function add(pId) {
    layer.open({
        type : 2,
        title : 'Add',
        maxmin : true,
        shadeClose : false, // 点击遮罩关闭层
        area : [ '800px', '520px' ],
        content : prefix + '/add/' + pId
    });
}
function edit(id) {
    layer.open({
        type : 2,
        title : 'Edit',
        maxmin : true,
        shadeClose : false, // 点击遮罩关闭层
        area : [ '800px', '520px' ],
        content : prefix + '/edit/' + id // iframe的url
    });
}
function removeone(id) {
    layer.confirm('Are you sure to delete the selected one？', {
        btn : [ 'Ok', 'Cancel' ]
    }, function() {
        $.ajax({
            url : prefix + "/remove",
            type : "post",
            data : {
                'categoryId' : id
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

function batchRemove() {
    var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
    if (rows.length == 0) {
        layer.msg("请选择要删除的数据");
        return;
    }
    layer.confirm("确认要删除选中的'" + rows.length + "'条数据吗?", {
        btn : [ '确定', '取消' ]
        // 按钮
    }, function() {
        var ids = new Array();
        // 遍历所有选择的行数据，取每条数据对应的ID
        $.each(rows, function(i, row) {
            ids[i] = row['deptId'];
        });
        $.ajax({
            type : 'POST',
            data : {
                "ids" : ids
            },
            url : prefix + '/batchRemove',
            success : function(r) {
                if (r.code == 0) {
                    layer.msg(r.msg);
                    reLoad();
                } else {
                    layer.msg(r.msg);
                }
            }
        });
    }, function() {});
}

