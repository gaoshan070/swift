package com.swift.core.domain.product;


import java.util.List;

/**
 * Created by gaoshan on 28/10/18.
 */
public class ProductDO {

    private String id;
    private String name;
    private String productType;
    private int catalogId; //分类ID
    private String catalogName;
    private String introduce;// 商品简介
    private String price;// 定价
    private String nowPrice;// 现价
    private String content;// 商品介绍的HTML
    private String picture;// 小图片地址
    private String maxPicture;// 大图片地址
    private String images;//商品图片列表
    private String isnew;// 是否新品。n：否，y：是
    private int isRecommend = 0;
    private String sale;// 是否特价。n：否，y：是
    private int stock;//库存
    private int status;//商品状态。1：新增，2：已上架，3：已下架
    private String startDate;
    private String endDate;
    private String title;
    private String description;
    private String keywords;
    private String createAccount;
    private String createTime;
    private String updateAccount;
    private String updateTime;

    private String additionalImg1;  //商品轮播图片1
    private String additionalImg2;  //商品轮播图片2
    private String additionalImg3;  //商品轮播图片3
    private String additionalImg4;  //商品轮播图片4
    private List<String> additionalImgList; //商品轮播图片列表
    private String fancyImg; //商品设计模板图片
    private String bottleInfo;
    private String labelInfo;

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

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public int getCatalogId() {
        return catalogId;
    }

    public void setCatalogId(int catalogId) {
        this.catalogId = catalogId;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getNowPrice() {
        return nowPrice;
    }

    public void setNowPrice(String nowPrice) {
        this.nowPrice = nowPrice;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getMaxPicture() {
        return maxPicture;
    }

    public void setMaxPicture(String maxPicture) {
        this.maxPicture = maxPicture;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public String getIsnew() {
        return isnew;
    }

    public void setIsnew(String isnew) {
        this.isnew = isnew;
    }

    public int getIsRecommend() {
        return isRecommend;
    }

    public void setIsRecommend(int isRecommend) {
        this.isRecommend = isRecommend;
    }

    public String getSale() {
        return sale;
    }

    public void setSale(String sale) {
        this.sale = sale;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getCreateAccount() {
        return createAccount;
    }

    public void setCreateAccount(String createAccount) {
        this.createAccount = createAccount;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdateAccount() {
        return updateAccount;
    }

    public void setUpdateAccount(String updateAccount) {
        this.updateAccount = updateAccount;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getCatalogName() {
        return catalogName;
    }

    public void setCatalogName(String catalogName) {
        this.catalogName = catalogName;
    }

    public String getAdditionalImg1() {
        return additionalImg1;
    }

    public void setAdditionalImg1(String additionalImg1) {
        this.additionalImg1 = additionalImg1;
    }

    public String getAdditionalImg2() {
        return additionalImg2;
    }

    public void setAdditionalImg2(String additionalImg2) {
        this.additionalImg2 = additionalImg2;
    }

    public String getAdditionalImg3() {
        return additionalImg3;
    }

    public void setAdditionalImg3(String additionalImg3) {
        this.additionalImg3 = additionalImg3;
    }

    public String getAdditionalImg4() {
        return additionalImg4;
    }

    public void setAdditionalImg4(String additionalImg4) {
        this.additionalImg4 = additionalImg4;
    }

    public List<String> getAdditionalImgList() {
        return additionalImgList;
    }

    public void setAdditionalImgList(List<String> additionalImgList) {
        this.additionalImgList = additionalImgList;
    }

    public String getFancyImg() {
        return fancyImg;
    }

    public void setFancyImg(String fancyImg) {
        this.fancyImg = fancyImg;
    }

    public String getBottleInfo() {
        return bottleInfo;
    }

    public void setBottleInfo(String bottleInfo) {
        this.bottleInfo = bottleInfo;
    }

    public String getLabelInfo() {
        return labelInfo;
    }

    public void setLabelInfo(String labelInfo) {
        this.labelInfo = labelInfo;
    }
}
