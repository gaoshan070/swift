package com.swift.core.domain.product;

/**
 * Created by gaoshan on 25/11/18.
 */
public class OrderShipDO {

    private int id;
    private String orderId;
    private String shipName;
    private String shipAddress;
    private String province;
    private String city;
    private String area;
    private String phone;
    private String tel;
    private String zip;
    private String shippingInfo;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getShipName() {
        return shipName;
    }

    public void setShipName(String shipName) {
        this.shipName = shipName;
    }

    public String getShipAddress() {
        return shipAddress;
    }

    public void setShipAddress(String shipAddress) {
        this.shipAddress = shipAddress;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getShippingInfo() {
        StringBuilder sb = new StringBuilder();
        sb.append(this.getShipName()+"<br/>");
        sb.append(this.getShipAddress() + "<br/>");
        sb.append(this.getCity()+ " "+ this.getZip() +"<br/>");
        sb.append(this.getProvince()+ "<br/>");
        sb.append(this.getArea());
        return  sb.toString();
    }
}
