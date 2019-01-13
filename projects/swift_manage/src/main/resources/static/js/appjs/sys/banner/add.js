$().ready(function() {
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
                $("#pcImage").val(r.fileName);
                $("#uploadPic").attr("src",r.fileName);
                $("#uploadPic").show();
                layer.msg(r.msg);
            },
            error: function (r) {
                layer.msg(r.msg);
            }
        });
    });

    layui.use('upload', function() {
        var upload = layui.upload;
        //执行实例
        var uploadMobileInst = upload.render({
            elem: '#mobileImageFile', //绑定元素
            url: '/common/sysFile/upload', //上传接口
            size: 1000,
            accept: 'file',
            done: function (r) {
                $("#mobileImage").val(r.fileName);
                $("#uploadMobilePic").attr("src",r.fileName);
                $("#uploadMobilePic").show();
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
        save();
    }
});

function save() {
    $.ajax({
        cache : true,
        type : "POST",
        url : "/system/banner/save",
        data : $('#signupForm').serialize(),// 你的formid
        async : false,
        error : function(request) {
            parent.layer.alert("Connection error");
        },
        success : function(data) {
            if (data.code == 0) {
                parent.layer.msg("Successful to save a banner");
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
            title : {
                required : true
            },
            pcImage : {
                required : true
            },
            mobileImage : {
                required : true
            },
            pcUrl : {
                required : true
            },
            agree : "required"
        },
        messages : {

            title : {
                required : icon + "Banner title could not be null"
            },
            pcImage : {
                required : icon + "Pc image could not be null"
            },
            mobileImage : {
                required : icon + "Mobile image could not be null"
            },
            pcUrl : icon + "url is not correct",
        }
    })
}

