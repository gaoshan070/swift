package com.swift.core.domain.system;

/**
 * Created by gaoshan on 6/11/18.
 */
public class BannerDO {

    private Long id;
    private int pos = 0;
    private String title;
    private String pcImage;
    private String mobileImage;
    private String pcUrl;
    private String pcBgColor;
    private String pcFontColor;
    private int type; //1: index, 2: solution
    private int status = 1;
    private String createTime;
    private String startTime;
    private String endTime;
    private String content;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getPos() {
        return pos;
    }

    public void setPos(int pos) {
        this.pos = pos;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getStatus() {
        return status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPcImage() {
        return pcImage;
    }

    public void setPcImage(String pcImage) {
        this.pcImage = pcImage;
    }

    public String getPcUrl() {
        return pcUrl;
    }

    public void setPcUrl(String pcUrl) {
        this.pcUrl = pcUrl;
    }

    public String getPcBgColor() {
        return pcBgColor;
    }

    public void setPcBgColor(String pcBgColor) {
        this.pcBgColor = pcBgColor;
    }

    public String getPcFontColor() {
        return pcFontColor;
    }

    public void setPcFontColor(String pcFontColor) {
        this.pcFontColor = pcFontColor;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getMobileImage() {
        return mobileImage;
    }

    public void setMobileImage(String mobileImage) {
        this.mobileImage = mobileImage;
    }
}
