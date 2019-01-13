
var fpd_product_builder_opts = {
    adminUrl: "/product/fancy/ajax_url",
    changeImageSource: "Change Image Source",
    chooseElementImageTitle: "Choose an element image",
    defaultFont: "Arial",
    enabled_fonts: {name:"shouldve known",url:"/fpd_fonts/shouldve_known.ttf"},
    enterTitlePrompt: "Enter a title for the element",
    enterYourText: "Enter your text.",
    loading: "Loading",
    mask_svg_alert: "The image is not a SVG, you can only use SVG as view mask!",
    notChanged: "You have not saved your changes!",
    originX: "",
    originY: "",
    paddingControl: "10",
    removeElement: "Remove element?",
    set: "Set",
    uploadZonesTopped: "1"
};

var $fpd = $('#fpd'),
    fancyProductDesigner,
    $elementLists = $('#fpd-elements-list'),
    $parametersForm =  $('form#fpd-elements-form'),
    $currentListItem = null,
    $parametersPanel = $('#fpd-edit-parameters > .tab-content'),
    fpdActions,
    initialProduct = [],
    changesAreSaved = true,
    updatingFormFields = false,
    productCreated = false,
    boundingBoxRect = null,
    stage = null,
    viewInstance = null,
    imageTitle,
    imageParams = {},
    pluginsOptions = {
        stageWidth: Number($fpd.data('stagewidth')),
        stageHeight: Number($fpd.data('stageheight')),
        responsive: false,
        langJSON: false,
        templatesDirectory: false,
        editorMode: true,
        keyboardControl: false,
        deselectActiveOnOutside: false,
        uploadZonesTopped: 1,
        elementParameters: {
            originX: "",
            originY: "",
        },
        textParameters: {
            fontFamily: "Arial",
            fontSize: 18
        },
        fonts: {name:"shouldve known",
            url: "http://www.sweetgift.co.nz/wp-content/uploads/fpd_fonts/shouldve_known.ttf"}

    };

$fpd.on("ready", function(){
    fancyProductDesigner = $(this).data('instance');
    fpdActions = new FPDActions(fancyProductDesigner, false);

    $.ajax({
        url: fpd_product_builder_opts.adminUrl,
        data: {
            action: 'fpd_loadview',
            view_id: $fpd.data('viewid')
        },
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            initialProduct = [{
                title: 'preview',
                thumbnail: '',
                elements: [],
                options: {}
            }];
            if(data && data.elements) {
                //V2 - views are serialized - string is newer
                var elements = typeof data.elements === 'string' ? JSON.parse(data.elements) : data.elements;
                //check that all number stings are parsed as number, <V3.0
                for(var i=0; i < elements.length; ++i) {
                    var elementParams = elements[i].parameters;
                    $.each(elementParams, function(key, value) {
                        elementParams[key] = isNaN(value) ? value : Number(value);
                    });
                    var pbOpts = FPDUtil.rekeyDeprecatedKeys($.extend({}, elementParams));
                    elements[i].parameters.pbOptions = pbOpts;
                }
                initialProduct[0].elements = elements;
            }

            fancyProductDesigner.toggleSpinner(true, "Loading");
            fancyProductDesigner.loadProduct(initialProduct);
        }
    });
})
.on('elementRemove', function(evt, element) {
    $elementLists.children('#'+element.id).remove();
    _updateFormState();
    changesAreSaved = false;
})
.on("elementModify", function(evt, element, parameters){
    console.log("elementModify")
    if(productCreated) {
        console.log("product created");
        if(parameters.text) {
            $elementLists.children('.fpd-layer-item#'+element.id+'')
                .find('[name="element_titles[]"], [name="element_sources[]"]')
                .val(parameters.text);
        }
        //only numeric values
        else if(parameters.hasOwnProperty('left') ||
            parameters.hasOwnProperty('angle') ||
            parameters.hasOwnProperty('scaleX') ||
            parameters.hasOwnProperty('fontSize')
        ) {
            _setFormFields(element);
        }
    }
})
.on('elementAdd', function(evt, element) {

    if(element.locked) {
        element.set('evented', false);
    }
    var type = FPDUtil.getType(element.type),
        imageHTML = type === 'image' ? "<img src='"+element.source+"' />" : "",
        imageToolHTML = type === 'image' ? "<a href='#' class='fpd-change-image'><i class='fpd-admin-icon-repeat'></i></a>" : "",
        lockedIcon = element.locked ? "fpd-admin-icon-lock" : "fpd-admin-icon-lock-open";

    //new element added
    if(element.pbOptions === undefined) {
        element.center();
        element.setCoords();
        stage.renderAll();
        element.pbOptions = {left: Math.round(element.left), top: Math.round(element.top)};
    }
    $elementLists.append("<div id='"+element.id+"' class='fpd-layer-item fpd-layer-item--"+type+"'><input type='text' name='element_titles[]' value='"+element.title+"' />"+imageHTML+"<textarea name='element_sources[]'>"+element.source+"</textarea><div class='fpd-layer-item-tools'>"+imageToolHTML+"<a href='#' class='fpd-lock-element'><i class='"+lockedIcon+"'></i></a><a href='#' class='fpd-trash-element'><i class='fpd-admin-icon-bin'></i></a></div><input type='hidden' name='element_types[]' value='"+type+"'/><input type='hidden' name='element_parameters[]' value='"+JSON.stringify(element.pbOptions)+"'/></div>");
    if(productCreated) {
        stage.setActiveObject(element);
        _setFormFields(element);
    }
})
.on('productCreate', function() {
    viewInstance = fancyProductDesigner.currentViewInstance;
    stage = viewInstance.stage;

    //create a bounding box rectangle
    boundingBoxRect = new fabric.Rect({
        stroke: 'blue',
        strokeWidth: 1,
        strokeDashArray: [5, 5],
        fill: false,
        selectable: false,
        visible: false,
        evented: false,
        selectable: false,
        transparentCorners: false,
        cornerSize: 20,
        originX: 'left',
        originY: 'top'
    });
    stage.add(boundingBoxRect);

    stage.on({
        'mouse:down': function(opts) {
            if(opts.target == undefined) {
                _updateFormState();
            }
        },
        'object:selected': function(opts) {
            if($currentListItem && opts.target.id !== $currentListItem.attr('id')) {
                $currentListItem.find('textarea, input').blur();
            }
            _updateFormState();
            _setFormFields();

            setTimeout(function(){
                opts.target.setCoords();
                stage.calcOffset().renderAll();
            }, 50);
            opts.target.drawBorders(stage.contextContainer);
            opts.target.drawControls(stage.contextContainer);
        }
    });
    $('#fpd-manage-elements').children('.fpd-ui-blocker').remove();
    productCreated = true;
    console.log("productCreated:"+productCreated);
})
//elementSelect
.on("elementSelect", function(evt, element){
    if(element != null){
        // $("#left").val(Math.round(element.left));
        // $("#top").val(Math.round(element.top));
        _setFormFields(element);
    }
});

new FancyProductDesigner($fpd, pluginsOptions);
//submit form
$('#fpd-save-layers').click(function(evt) {
    evt.preventDefault();
    if(productCreated) {
        $('[name="save_elements"]').click();
    }
});

//let the page know that elements are now saved
$('input[name="save_elements"]').click(function() {
    fancyProductDesigner.deselectElement();
    changesAreSaved = true;
    _saveLayers();
});

$elementLists.on('click', '.fpd-layer-item', function(evt) {
    stage.setActiveObject(viewInstance.getElementByID(this.id));
});

$elementLists.on('keyup', '[name="element_sources[]"]', function(evt) {
    var $this = $(this),
        activeObj = stage.getActiveObject();
    //when list item is not selected
    if(activeObj === undefined) {
        $this.parents('li:first').click();
        activeObj = stage.getActiveObject()
    }
    if(FPDUtil.getType(activeObj.type) == 'text') {
        activeObj.setText(this.value);
        activeObj.setCoords();
        stage.renderAll().calcOffset();
        $currentListItem.find('[name="element_titles[]"]').val(this.value);
    }
});

$parametersForm.on('change', 'input:not([name="hidden-colors"]), select', function(evt) {

    var $option = $(this),
        type = $option.attr('type');

    if($option.hasClass('fpd-svg-options') && $option.attr('name') == 'colors') {

        _toggleFormFields('.fpd-color-options:first input', Number($option.val()) === 0);

    }

    if(viewInstance && viewInstance.currentElement && updatingFormFields === false) {

        var params = {},
            key = $option.attr('name'),
            value = $option.val();

        if(type == 'checkbox') {

            params[key] = $option.is(':checked') ? 1 : 0;
            if($option.hasClass('fpd-toggle-button')) {
                params[key] = $option.is(':checked') ?  value : $option.data('unchecked');
            }

            if($option.data('checkedsel')) {
                $($option.data('checkedsel')).toggle($option.is(':checked'));
            }

            if($option.data('uncheckedsel')) {
                $($option.data('uncheckedsel')).toggle(!$option.is(':checked'));
            }
        }
        else if(key == 'fill' && !FPDUtil.isHex(value)) {
            params.fill = false;
        }
        else {
            if(key == 'scaleX' && $('#fpd-scale-locker').hasClass('fpd-admin-icon-lock')) {
                params.scaleY = Number(value);
            }
            params[key] = isNaN(value) || value === '' ? value : Number(value);
        }
        _optionHandling($option);
        viewInstance.setElementParameters(params);
        _setParameters();

    }
}).on('keypress', function(evt) {
        if (evt.keyCode == 13) {
            $(evt.target).change();
            return false;
        }
    });

$('#fpd-add-image-element, #fpd-add-text-element, #fpd-add-curved-text-element, #fpd-add-upload-zone, #fpd-add-text-box-element').click(function(evt) {
    evt.preventDefault();
    fancyProductDesigner.deselectElement();
    $currentListItem = null;
    var $this = $(this);

    layer.prompt({
        formType: 2,
        value: '',
        title: 'enter title',
        btn:["OK","Cancel"],
        area: ['200px', '20px'] //自定义文本域宽高
    }, function(value, index, elem){
        var title = value;
        if(title === false) {
            fpdMessage("enter title", 'error');
        }
        else if(title !== null) {
            //add image or upload zone
            if($this.attr('id') == 'fpd-add-image-element' || $this.attr('id') == 'fpd-add-upload-zone') {
                var addUploadZone = $this.attr('id') == 'fpd-add-upload-zone';
                imageTitle = title;

                if(addUploadZone){
                    imageParams.uploadZone = 1;
                    imageParams.rotatable = false;
                }
                layer.open({
                    type : 2,
                    title : 'Choose a picture',
                    maxmin : true,
                    shadeClose : false, // 点击遮罩关闭层
                    area : [ '800px', '520px' ],
                    content : '/common/media'
                });
            }
            //add text
            else {
                var params = {};
                if($this.attr('id') == 'fpd-add-curved-text-element') {
                    params.curved = 1;
                    params.textAlign = 'center';
                }
                else if($this.attr('id') == 'fpd-add-text-box-element') {
                    params.textBox = true;
                    params.width = 200;
                    params.height = 100;
                }
                fancyProductDesigner.addElement(
                    'text',
                    title,
                    title,
                    params
                );
            }
        }
        layer.close(index);
    });
});

function _updateFormState() {
    updatingFormFields = true;
    var currentElement = stage.getActiveObject();
    $('.tm-input').tagsManager('empty');
    //object is selected
    if(currentElement && currentElement.selectable) {
        $parametersForm.find('input, select').prop('disabled', false);
        $elementLists.children('.fpd-layer-item').removeClass('fpd-active-item');
        $currentListItem = $elementLists.children('#'+currentElement.id).addClass('fpd-active-item');
        _hideTab('color-options', FPDUtil.elementIsColorizable(currentElement) === false);
        _hideTab('text-options', FPDUtil.getType(currentElement.type) !== 'text');
        _hideTab('upload-zone-options', !currentElement.uploadZone);
        _hideTab('bb-options', Boolean(currentElement.uploadZone));
        if(FPDUtil.elementIsColorizable(currentElement) === 'svg') {
            //if every path color is false or colors are set
            _toggleFormFields('.fpd-color-options:first input', Number(currentElement.colors) === 0 || $.isArray(currentElement.colors));
        }
        else {
            _toggleFormFields('.fpd-color-options input', FPDUtil.elementIsColorizable(currentElement));
        }

        $('.fpd-color-options').not(':first').toggleClass('radykal-hidden', FPDUtil.elementIsColorizable(currentElement) === 'svg');
        _toggleFormFields('.fpd-svg-options', FPDUtil.elementIsColorizable(currentElement) === 'svg');
        _toggleFormFields('.fpd-upload-zone-hidden', !currentElement.uploadZone);
        _toggleFormFields('[name="curvable"], [name="resizable"]', currentElement.type !== 'textbox');
        _toggleFormFields('.fpd-text-hidden', FPDUtil.getType(currentElement.type) !== 'text');
        _toggleFormFields('[name="advancedEditing"]', FPDUtil.getType(currentElement.type) === 'image');
        $('.fpd-curved-text-opts').toggleClass('radykal-hidden', !currentElement.curved);
        if(currentElement.type === 'curvedText') {
            _toggleFormFields('[name="scaleX"], [name="scaleY"]', true);
        }
        $('.fpd-text-box-opts').toggleClass('radykal-hidden', !currentElement.textBox);
        if(currentElement.type === 'textbox') {
            _toggleFormFields('[name="scaleX"], [name="scaleY"]', false);
        }
        $('#fpd-element-toolbar .fpd-element-toggle')
            .add($parametersPanel)
            .removeClass('radykal-disabled');
    }
    //no selected objecct
    else {
        $parametersPanel.addClass('radykal-disabled');
        $('#fpd-element-toolbar .fpd-element-toggle').addClass('radykal-disabled');
        $elementLists.children('.fpd-layer-item').removeClass('fpd-active-item');
        boundingBoxRect.visible = false;
        $currentListItem = null;

    }
    $parametersPanel.find('.radykal-tabs-nav > a:first').click();

};

function _setFormFields(element) {
    console.log("setFormFields");
    var formElementOpts = {},
        productBuilderOpts;

    if(element === undefined) { //get element properties from hidden input
        var elemParams = $currentListItem.children('[name="element_parameters[]"]').val();
        formElementOpts = JSON.parse(elemParams) || {},
            productBuilderOpts = formElementOpts;
    }
    else { //get properties from element
        productBuilderOpts = element;
    }

    $parametersForm.find('input, select').each(function(i, option) {

        var $option = $(option),
            type = $option.attr('type'),
            prop = $option.attr('name');

        if(type == 'text' || type == 'number') {

            if(productBuilderOpts.hasOwnProperty(prop) && productBuilderOpts[prop] !== false) {
                var value = productBuilderOpts[prop];

                if(type == 'number') {
                    value = $option.hasClass('fpd-allow-dots') ? parseFloat(value).toFixed(2) : parseInt(value);
                }
                else {
                    value = isNaN(value) ? value : '';
                }

                $option.val(value);

                if($option.prev('.ui-slider').length > 0) {
                    $option.prev('.ui-slider').slider('value', Number(value));
                }

                if($option.hasClass('wp-color-picker')) {
                    $option.wpColorPicker('color', value);
                }
            }
            else {
                $option.val('');
            }

        }
        else if(type == 'checkbox') {

            if($option.hasClass('fpd-toggle-button')) {
                $option.prop('checked', productBuilderOpts[prop] == $option.val());
                $option.prevAll('.fpd-'+$option.val()+'.button').toggleClass('active', $option.is(':checked'));
            }
            else {
                $option.prop('checked', Boolean(productBuilderOpts[prop]) || false);
                if($option.data('checkedsel')) {
                    $($option.data('checkedsel')).toggle($option.is(':checked'));

                }
                if($option.data('uncheckedsel')) {
                    $($option.data('uncheckedsel')).toggle(!$option.is(':checked'));
                }

            }

        }
        else if(type == 'radio') {

            if(formElementOpts[prop] !== undefined) {
                $option.prop('checked', formElementOpts[prop] == $option.val());
            }

            if(prop == 'colors' && isNaN(formElementOpts[prop])) {
                $option.prop('checked', Number($option.val()) === 0);
            }

        }
        else if($option.is('select')) {

            if(prop == 'fontFamily') {
                $option.val(productBuilderOpts.hasOwnProperty(prop) ? productBuilderOpts[prop] : fpd_product_builder_opts.defaultFont);
            }
            else if(prop == 'designCategories[]') {
                $option.val(productBuilderOpts.hasOwnProperty(prop) ? productBuilderOpts[prop] : '');
            }
            else {
                $option.val(productBuilderOpts.hasOwnProperty(prop) ? productBuilderOpts[prop] : $option.val());
            }

            $option.children('option[value="'+productBuilderOpts[prop]+'"]').prop('selected', true);

            if(element === undefined) {
                $option.change();
            }

        }
        else if($option.hasClass('fpd-radio-buttons')) {

            $option.val((productBuilderOpts[prop] || $option.val()))
                .prevAll('.button').removeClass('active')
                .filter('[data-value="'+(productBuilderOpts[prop] || $option.val())+'"]').addClass('active');

        }
        console.log("option:"+$option);
        _optionHandling($option);


    });

    //set color tags
    if(productBuilderOpts.colors && productBuilderOpts.colors.length > 0 && unescape(productBuilderOpts.colors).charAt(0) == '#') {

        var colorArray = unescape(productBuilderOpts.colors).split(',');
        for(var i=0; i < colorArray.length; ++i) {
            $('.tm-input').tagsManager('pushTag', colorArray[i]);
        }

    }

    stage.calcOffset().renderAll();
    updatingFormFields = false;
    _setParameters();

};

function _toggleFormFields(selector, toggle) {

    toggle = toggle === undefined ? false : toggle;
    toggle = Boolean(toggle);

    $(selector).each(function(i, field) {

        var $field = $(field);

        //if input:text or number, reset input
        if(!toggle && ($field.is('input:text') || $field.attr('type') == 'number')) {
            $field.val('');
        }

        $field.prop('disabled', !toggle)
            .parents('tr:first').toggle(toggle);

    });

};

function _setParameters() {

    if(!$currentListItem) {
        return;
    }

    var parameters = {};
    $parametersForm.find('input, select').each(function(i, option) {

        var $option = $(option);

        if(!$option.is(':disabled') && $option.val() !== '' && $option.attr('name') !== undefined) {

            var	key = $option.attr('name'),
                value = $option.val(),
                type = $option.attr('type');

            if(key === 'hidden-colors') {
                key = 'colors';
            }

            if(type == 'number' || type == 'text') {
                value = isNaN(value) ? value : Number(value);
            }
            else if(type == 'checkbox') {

                value = $option.is(':checked') ? 1 : 0;
                if($option.hasClass('fpd-toggle-button')) {
                    value = $option.is(':checked') ? $option.val() : $option.data('unchecked');
                }
            }
            else if(type == 'radio') {
                value = $option.is(':checked') ? (isNaN($option.val()) ? $option.val() : Number($option.val())) : null;
            }

            if(value !== null) {
                parameters[key] = value;
            }

        }

    });

    $currentListItem.children('input[name="element_parameters[]"]').val(JSON.stringify(parameters));
    console.log("setParameters:"+JSON.stringify(parameters));
    changesAreSaved = false;

};

var _optionHandling = function($option) {
    if($option.is('select')) {
        if($option.data('toggle')) {
            var toggles = $option.data('toggle').split(',');
            for(var i=0; i<toggles.length; ++i) {
                var toggleEntry = toggles[i].split('=');
                _toggleFormFields(toggleEntry[0], $option.val() == toggleEntry[1]);
            }
        }
    }
};

var _saveLayers = function() {
    $.ajax({
        cache : true,
        type : "POST",
        url : "/product/fancy/layer/save",
        data : $('#fpd-submit').serialize(),// 你的formid
        async : false,
        error : function(request) {
            // parent.layer.alert("Connection error");
        },
        success : function(data) {
            if (data.code == 0) {
                layer.msg("Successful to save a template");
                // parent.layer.msg("Successful to save a template");
                // parent.reLoad();
                // var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
                // parent.layer.close(index);
            } else {
                // parent.layer.alert(data.msg);
            }

        }
    });
}

function _hideTab(id, hide) {

    hide = hide === undefined ? true : hide;
    hide = Boolean(hide);

    $parametersPanel.find('.radykal-tabs-nav > [href="'+id+'"]').toggleClass('radykal-hidden', hide);
    $parametersPanel.find('.radykal-tabs-content > [data-id="'+id+'"]').find('input, select').prop('disabled', hide);

};


function createElementFromChild(imageUrl){
    fancyProductDesigner.addElement(
        'image',
        imageUrl,
        imageTitle,
        imageParams
    );
}