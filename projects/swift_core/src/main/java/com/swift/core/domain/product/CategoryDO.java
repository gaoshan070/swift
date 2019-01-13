package com.swift.core.domain.product;

import java.util.List;

/**
 * Created by gaoshan on 28/10/18.
 */
public class CategoryDO {

    private String id;
    private String pid;
    private String name;
    private String code;
    private int order1;
    private String type;
    private String showInNav;
    private List<CategoryDO> children;

    private String showInNavStr;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getOrder1() {
        return order1;
    }

    public void setOrder1(int order1) {
        this.order1 = order1;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getShowInNav() {
        return showInNav;
    }

    public void setShowInNav(String showInNav) {
        this.showInNav = showInNav;
    }

    public String getShowInNavStr() {
        return showInNavStr;
    }

    public void setShowInNavStr(String showInNavStr) {
        this.showInNavStr = showInNavStr;
    }

    public List<CategoryDO> getChildren() {
        return children;
    }

    public void setChildren(List<CategoryDO> children) {
        this.children = children;
    }
}
