package com.swift.core.domain.product;

/**
 * Created by gaoshan on 29/10/18.
 */
public class OrderInfoDO {

    private String id;
    private String name;
    private String nowPrice;
    private String number;
    private String picture;
    private String fee;
    private String total0;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNowPrice() {
        return nowPrice;
    }

    public void setNowPrice(String nowPrice) {
        this.nowPrice = nowPrice;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getFee() {
        return fee;
    }

    public void setFee(String fee) {
        this.fee = fee;
    }

    public String getTotal0() {
        return total0;
    }

    public void setTotal0(String total0) {
        this.total0 = total0;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
