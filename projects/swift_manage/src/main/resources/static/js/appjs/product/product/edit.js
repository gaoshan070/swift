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

    var content = $("#content").val();

    var labelContent = $("#labelInfo").val();
    var bottleContent = $("#bottleInfo").val();
    $('#content_sn').summernote('code', content);
    $('#content_label').summernote('code', labelContent);
    $('#content_bottle').summernote('code', bottleContent);

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

    layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#addImg1', //绑定元素
            url: '/common/sysFile/upload', //上传接口
            size: 1000,
            accept: 'file',
            done: function (r) {
                $("#additionalImg1").val(r.fileName);
                $("#uploadImg1").attr("src",r.fileName);
                $("#uploadImg1").show();
                layer.msg(r.msg);
            },
            error: function (r) {
                layer.msg(r.msg);
            }
        });
    });

    layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#addImg2', //绑定元素
            url: '/common/sysFile/upload', //上传接口
            size: 1000,
            accept: 'file',
            done: function (r) {
                $("#additionalImg2").val(r.fileName);
                $("#uploadImg2").attr("src",r.fileName);
                $("#uploadImg2").show();
                layer.msg(r.msg);
            },
            error: function (r) {
                layer.msg(r.msg);
            }
        });
    });

    layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#addImg3', //绑定元素
            url: '/common/sysFile/upload', //上传接口
            size: 1000,
            accept: 'file',
            done: function (r) {
                $("#additionalImg3").val(r.fileName);
                $("#uploadImg3").attr("src",r.fileName);
                $("#uploadImg3").show();
                layer.msg(r.msg);
            },
            error: function (r) {
                layer.msg(r.msg);
            }
        });
    });

    layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#addImg4', //绑定元素
            url: '/common/sysFile/upload', //上传接口
            size: 1000,
            accept: 'file',
            done: function (r) {
                $("#additionalImg4").val(r.fileName);
                $("#uploadImg4").attr("src",r.fileName);
                $("#uploadImg4").show();
                layer.msg(r.msg);
            },
            error: function (r) {
                layer.msg(r.msg);
            }
        });
    });

    layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#fancyImage', //绑定元素
            url: '/common/sysFile/upload', //上传接口
            size: 1000,
            accept: 'file',
            done: function (r) {
                $("#fancyImg").val(r.fileName);
                $("#uploadFancyImg").attr("src",r.fileName);
                $("#uploadFancyImg").show();
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

function addTrFunc(img){
    var cc = $("#firstTd").clone();
    $("#firstTd").after(cc);
    cc.show();
    cc.find("img").first().attr("src", img);
}

function removeImg(ele) {
    $(ele).parent("td").remove();
}

function save() {
    var content_sn = $("#content_sn").summernote('code');
    var content_label = $("#content_label").summernote('code');
    var content_bottle = $("#content_bottle").summernote('code');
    $("#content").val(content_sn);
    $("#labelInfo").val(content_label);
    $("#bottleInfo").val(content_bottle);

    $.ajax({
        cache : true,
        type : "POST",
        url : "/product/update",
        data : $('#signupForm').serialize(),// 你的formid
        async : false,
        error : function(request) {
            parent.layer.alert("Connection error");
        },
        success : function(data) {
            if (data.code == 0) {
                parent.layer.msg("Successful to update a product");
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
            name : {
                required : true
            },
            picture : {
                required : true
            },
            price : {
                required : true
            },
            nowPrice : {
                required : true
            },
            agree : "required"
        },
        messages : {

            name : {
                required : icon + "Product title could not be null"
            },
            picture : {
                required : icon + "Main picture could not be null"
            },
            price : icon + "price is not correct",
            nowPrice : icon + "Sale price is not correct",
        }
    })
}

var openCategory = function(){
    layer.open({
        type:2,
        title:"Choose a category",
        area : [ '300px', '450px' ],
        content:"/product/category/treeView"
    })
}
function loadCategory( categoryId,categoryName){
    $("#catalogId").val(categoryId);
    $("#categoryName").val(categoryName);
}

