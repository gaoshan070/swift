$().ready(function() {

    $('.summernote').summernote({
        height : '220px',
        // lang : 'zh-CN',
        callbacks: {
            onImageUpload: function(files, editor, $editable) {
                sendFile(files);
            }
        }
    });

    var content = $("#introduce").val();

    $('#content_sn').summernote('code', content);

    validateRule();

    layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#imageFile', //绑定元素
            url: '/common/sysFile/upload', //上传接口
            size: 1000,
            accept: 'file',
            done: function (r) {
                $("#picture").val(r.fileName);
                $("#uploadPic").attr("src",r.fileName);
                $("#uploadPic").show();
                layer.msg(r.msg);
            },
            error: function (r) {
                layer.msg(r.msg);
            }
        });
    });
});

$.validator.setDefaults({
    submitHandler : function() {
        update();
    }
});

function update() {
    var content_sn = $("#content_sn").summernote('code');
    $("#introduce").val(content_sn);
    $.ajax({
        cache : true,
        type : "POST",
        url : "/account/label/update",
        data : $('#signupForm').serialize(),// 你的formid
        async : false,
        error : function(request) {
            parent.layer.alert("Connection error");
        },
        success : function(data) {
            if (data.code == 0) {
                parent.layer.msg("Successful to save a product");
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
            company : {
                required : true
            },
            address : {
                required : true
            },
            email : {
                required : true
            },
            introduce : {
                required : true
            },
            agree : "required"
        },
        messages : {

            company : {
                required : icon + "company could not be null"
            },
            address : {
                required : icon + "address could not be null"
            },
            email : icon + "email is not correct",
            introduce : icon + "introduce is not correct"
        }
    })
}

