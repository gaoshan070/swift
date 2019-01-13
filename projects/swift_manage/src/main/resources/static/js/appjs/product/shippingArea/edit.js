var prefix = "/product/shippingArea";
$().ready(function() {
    validateRule();
});

$.validator.setDefaults({
    submitHandler : function() {
        update();
    }
});

function update() {
    $.ajax({
        cache : true,
        type : "POST",
        url : prefix + "/update",
        data : $('#signupForm').serialize(),// 你的formid
        async : false,
        error : function(request) {
            parent.layer.alert("Connection error");
        },
        success : function(data) {
            if (data.code == 0) {
                parent.layer.msg("Successful to update a shipping area");
                parent.reLoad();
                var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
                parent.layer.close(index);
            } else {
                parent.layer.alert(data.msg);
            }

        }
    });

}
function validateRule() {
    var icon = "<i class='fa fa-times-circle'></i> ";
    $("#signupForm").validate({
        rules : {
            area : {
                required : true
            },
            shippingFee : {
                required : true
            },
            agree : "required"
        },
        messages : {
            area : {
                required : icon + "Area could not be null"
            },
            shippingFee : icon + "Price is not correct",
        }
    })
}

