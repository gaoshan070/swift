package com.swift.core.common.utils;

import java.math.BigDecimal;
import java.text.DecimalFormat;

/**
 * Created by gaoshan on 10/11/18.
 */
public class NumberUtil {

    private NumberUtil() {
    }

    public static long getRandomNum(long min, long max) {
        return Math.round(min + Math.random() * (max - min));
    }

    public static String formatNumber(BigDecimal number) {
        DecimalFormat df = new DecimalFormat("0.00");
        float num = number.setScale(2, BigDecimal.ROUND_HALF_UP).floatValue();
        return df.format(num);
    }

    public static float formatFloat(float number) {
        return BigDecimal.valueOf(number).setScale(2, BigDecimal.ROUND_HALF_UP).floatValue();
    }

    public static float divide(BigDecimal divide, BigDecimal divisor) {
        BigDecimal newDivide = divide.setScale(2, BigDecimal.ROUND_HALF_UP);
        BigDecimal newDivisor = divisor.setScale(2, BigDecimal.ROUND_HALF_UP);
        return newDivide.divide(newDivisor, 2, BigDecimal.ROUND_HALF_UP).floatValue();
    }

    public static int multiplyInt(BigDecimal multiplierOne, BigDecimal multiplierTwo) {
        return multiply(multiplierOne, multiplierTwo).intValue();
    }

    public static float multiplyFloat(BigDecimal multiplierOne, BigDecimal multiplierTwo) {
        return formatFloat(multiply(multiplierOne, multiplierTwo).floatValue());
    }

    public static int convertFenFromYuan(float yuan) {
        BigDecimal bgYuan = BigDecimal.valueOf(yuan);
        BigDecimal bigDecimal = new BigDecimal(100);
        return multiply(bgYuan, bigDecimal).intValue();
    }

    public static float convertYuanFromFen(int fen) {
        BigDecimal bgFen = new BigDecimal(fen);
        BigDecimal bigDecimal = new BigDecimal(100);
        return divide(bgFen, bigDecimal);
    }

    private static BigDecimal multiply(BigDecimal multiplierOne, BigDecimal multiplierTwo) {
        BigDecimal newMultiplierOne = multiplierOne.setScale(2, BigDecimal.ROUND_HALF_UP);
        BigDecimal newMultiplierTwo = multiplierTwo.setScale(2, BigDecimal.ROUND_HALF_UP);
        return newMultiplierOne.multiply(newMultiplierTwo);
    }

    private static BigDecimal add(BigDecimal multiplierOne, BigDecimal multiplierTwo) {
        BigDecimal newMultiplierOne = multiplierOne.setScale(2, BigDecimal.ROUND_HALF_UP);
        BigDecimal newMultiplierTwo = multiplierTwo.setScale(2, BigDecimal.ROUND_HALF_UP);
        return newMultiplierOne.add(newMultiplierTwo);
    }
}
