var prefix = "/product/category/wholesale";
$(function() {
    var cId = $("#catalogId").val();
    load(cId);

    validateRule();
});

$.validator.setDefaults({
    submitHandler : function() {
        save();
    }
});

function load(cId) {
    $('#exampleTable')
        .bootstrapTreeTable(
            {
                id : 'id',
                code : 'id',
                parentCode : 'pid',
                type : "GET", // 请求数据的ajax类型
                url : prefix + '/list/' + cId, // 请求数据的ajax的url
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
                        field : 'amount',
                        title : 'Quantity',
                        valign : 'center',
                        witth :20
                    },
                    {
                        field : 'price',
                        title : 'Price',
                        align : 'center',
                        valign : 'center',
                    },
                    {
                        field : 'priceWithBottle',
                        title : 'Price with bottle',
                        align : 'center',
                        valign : 'center',
                    },
                    {
                        title : 'Action',
                        field : 'id',
                        align : 'center',
                        valign : 'center',
                        formatter : function(item, index) {
                            var e = '<a class="btn btn-primary btn-sm ' + s_edit_h + '" href="#" mce_href="#" title="Edit" onclick="edit(\''
                                + item.id
                                + '\')"><i class="fa fa-edit"></i></a> ';
                           return e;
                        }
                    } ]
            });
}

function save() {
    $.ajax({
        cache : true,
        type : "POST",
        url : prefix + "/save",
        data : $('#signupForm').serialize(),// 你的formid
        async : false,
        error : function(request) {
            parent.layer.alert("Connection error");
        },
        success : function(data) {
            if (data.code == 0) {
                parent.layer.msg("Success");
                reload();
                // var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
                // parent.layer.close(index);
            } else {
                parent.layer.alert(data.msg);
            }

        }
    });
}

function reload(){
    var cId = $("#catalogId").val();
    load(cId);
    clear();
}

function clear() {
    $("#id").val(0);
    document.getElementById("signupForm").reset();
}

function edit(id) {
    $.ajax({
        cache : true,
        type : "get",
        url : prefix + "/edit/"+id,
        data : {
            pId : id
        },
        async : false,
        error : function(request) {
            alert("Connection error");
        },
        success : function(data) {
            if (data.code == 0) {
                $("#amount").val(data.e.amount);
                $("#price").val(data.e.price);
                $("#priceWithBottle").val(data.e.priceWithBottle);
                $("#id").val(data.e.id);
            } else {
                parent.layer.msg(data.msg);
            }

        }
    });
}

function validateRule() {
    var icon = "<i class='fa fa-times-circle'></i> ";
    $("#signupForm").validate({
        rules : {
            amount : {
                required : true
            },
            price : {
                required : true
            },
            priceWithBottle : {
                required : true
            }
        },
        messages : {
            amount : {
                required : icon + "please enter the quantity"
            },
            price : {
                required : icon + "please enter the price"
            },
            priceWithBottle : {
                required : icon + "please enter the price with bottle"
            }
        }
    })
}


