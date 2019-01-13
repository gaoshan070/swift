package com.swift.core.domain.product;

/**
 * Created by gaoshan on 25/11/18.
 */
public class ShipInfoDO {

    private int id;
    private String orderId;
    private String account;
    private String country;
    private String region;
    private String city;
    private String address;
    private String postCode;
    private String optional;
    private String phone;
    private String firstName;
    private String surName;
    private String email;

    private String billingInfo;

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

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    public String getOptional() {
        return optional;
    }

    public void setOptional(String optional) {
        this.optional = optional;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurName() {
        return surName;
    }

    public void setSurName(String surName) {
        this.surName = surName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBillingInfo() {
        StringBuilder sb = new StringBuilder();
        sb.append(this.getFirstName()+" "+this.getSurName()+"<br/>");
        sb.append(this.getAddress() + "<br/>");
        sb.append(this.getCity()+ " "+ this.getPostCode() +"<br/>");
        sb.append(this.getRegion()+ "<br/>");
        sb.append(this.getCountry());
        return sb.toString();
    }

}
