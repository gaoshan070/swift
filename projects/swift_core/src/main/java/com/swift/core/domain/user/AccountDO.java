package com.swift.core.domain.user;

/**
 * Created by gaoshan on 9/11/18.
 */
public class AccountDO {

    private Integer id;
    private String account;
    private String nickName;
    private String password;
    private String email;
    private String emailIsActive;
    private String mobile;
    private String freeze;
    private String lastLoginTime;
    private String lastLoginIp;
    private String lastLoginArea;
    private String diffAreaLogin;
    private String regeistDate;
    private String freezeStartdate;
    private String freezeEnddate;
    private String rank;//会员等级
    private int score;//会员积分

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmailIsActive() {
        return emailIsActive;
    }

    public void setEmailIsActive(String emailIsActive) {
        this.emailIsActive = emailIsActive;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getFreeze() {
        return freeze;
    }

    public void setFreeze(String freeze) {
        this.freeze = freeze;
    }

    public String getLastLoginTime() {
        return lastLoginTime;
    }

    public void setLastLoginTime(String lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    public String getLastLoginIp() {
        return lastLoginIp;
    }

    public void setLastLoginIp(String lastLoginIp) {
        this.lastLoginIp = lastLoginIp;
    }

    public String getLastLoginArea() {
        return lastLoginArea;
    }

    public void setLastLoginArea(String lastLoginArea) {
        this.lastLoginArea = lastLoginArea;
    }

    public String getDiffAreaLogin() {
        return diffAreaLogin;
    }

    public void setDiffAreaLogin(String diffAreaLogin) {
        this.diffAreaLogin = diffAreaLogin;
    }

    public String getRegeistDate() {
        return regeistDate;
    }

    public void setRegeistDate(String regeistDate) {
        this.regeistDate = regeistDate;
    }

    public String getFreezeStartdate() {
        return freezeStartdate;
    }

    public void setFreezeStartdate(String freezeStartdate) {
        this.freezeStartdate = freezeStartdate;
    }

    public String getFreezeEnddate() {
        return freezeEnddate;
    }

    public void setFreezeEnddate(String freezeEnddate) {
        this.freezeEnddate = freezeEnddate;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
