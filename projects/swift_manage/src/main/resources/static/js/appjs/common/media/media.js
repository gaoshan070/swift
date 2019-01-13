var selectedImage = "";
$(document).ready(function() {

    layui.use(['layer', 'upload', "element"], function () {
        var upload = layui.upload //上传
            , layer = layui.layer //弹层
            , element = layui.element

        //上传
        upload.render({
            elem: '#uploadDemo'
            , url: '/common/sysFile/upload' //上传接口
            , done: function (r) {
                $("#uploadPic").attr("src",r.fileName);
                $("#uploadPic").show();
                selectedImage = r.fileName;
                layer.msg(r.msg);
            },
            error: function (r) {
                layer.msg(r.msg);
            }
        });

        var app = new Vue({
            el: '#pageDemo',
            data: {
                limit: 12,
                offset: 0,
                total: 0,
                file: '',
                type: '',
                rows: '',
            },
            methods: {
                getData: function () {
                    $.getJSON("/common/sysFile/list", {
                        limit: this.limit,
                        offset: this.offset,
                        type: this.type
                    }, function (r) {
                        app.total = r.total;
                        app.rows = r.rows;
                        app.page();
                    });
                },
                page: function () {
                    var options = {
                        currentPage: app.offset / 12 + 1, //当前页
                        totalPages: app.total / (12 + 1) + 1, //总页数
                        numberofPages: 4, //显示的页数
                        bootstrapMajorVersion: 3,
                        alignment: 'center',
                        size: 'large',
                        shouldShowPage: true,
                        itemTexts: function (type, page, current) { //修改显示文字
                            switch (type) {
                                case "first":
                                    return "First";
                                case "prev":
                                    return "Prev";
                                case "next":
                                    return "Next";
                                case "last":
                                    return "Last";
                                case "page":
                                    return page;
                            }
                        },
                        onPageClicked: function (event, originalEvent, type, page) {
                            app.offset = (page - 1) * 12;
                            app.getData();
                        }
                    };
                    $('#page').bootstrapPaginator(options);
                },
                changePic: function (url) {
                    selectedImage = url;
                },
                changeType: function (i) {
                    this.type = i;
                    this.offset = 0;
                    this.getData();
                }
            },
            created: function () {
                this.changeType('0')
            }
        });

    });

    $('#setPic').click(function(evt) {
        if(selectedImage == ""){
            layer.msg("please select a picture");
        }else{
            parent.createElementFromChild(selectedImage);
            var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
            parent.layer.close(index);
        }

    });
});