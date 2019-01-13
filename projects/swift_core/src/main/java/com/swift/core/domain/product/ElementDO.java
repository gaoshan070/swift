package com.swift.core.domain.product;

public class ElementDO {

    private String title;
    private String source;
    private String type;
    private ElementParameterDO parameters;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public ElementParameterDO getParameters() {
        return parameters;
    }

    public void setParameters(ElementParameterDO parameters) {
        this.parameters = parameters;
    }
}
