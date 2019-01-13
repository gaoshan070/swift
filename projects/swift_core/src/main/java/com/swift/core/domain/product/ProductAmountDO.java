package com.swift.core.domain.product;

/**
 * Created by gaoshan on 6/11/18.
 */
public class ProductAmountDO {

    private Long id;
    private int amount;
    private int catalogId;
    private float price;
    private float priceWithBottle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getCatalogId() {
        return catalogId;
    }

    public void setCatalogId(int catalogId) {
        this.catalogId = catalogId;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public float getPriceWithBottle() {
        return priceWithBottle;
    }

    public void setPriceWithBottle(float priceWithBottle) {
        this.priceWithBottle = priceWithBottle;
    }
}
