package com.swift.core.domain.product;

import com.swift.core.common.utils.NumberUtil;

/**
 * Created by gaoshan on 10/11/18.
 */
public class ShippingAreaDO {

    private Long id;
    private String countryCode;
    private String area;
    private int shippingFee;
    private float showFee;
    private float displayFee;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public int getShippingFee() {
        return shippingFee;
    }

    public void setShippingFee(int shippingFee) {
        this.shippingFee = shippingFee;
    }

    public float getShowFee() {
        return showFee;
    }

    public void setShowFee(float showFee) {
        this.showFee = showFee;
    }

    public float getDisplayFee() {
        return NumberUtil.convertYuanFromFen(shippingFee);
    }

    public void setDisplayFee(float displayFee) {
        this.displayFee = displayFee;
    }
}
