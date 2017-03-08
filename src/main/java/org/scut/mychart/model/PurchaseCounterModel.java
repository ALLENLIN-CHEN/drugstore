package org.scut.mychart.model;

/**
 * Created by crh on 2017/3/2.
 */
public class PurchaseCounterModel {
    private Integer yaer;//年份
    private Integer freCount;//购买次数>3的人数
    private Integer rareCount;//购买次数<=3的人数

    public Integer getYaer() {
        return yaer;
    }

    public void setYaer(Integer yaer) {
        this.yaer = yaer;
    }

    public Integer getFreCount() {
        return freCount;
    }

    public void setFreCount(Integer freCount) {
        this.freCount = freCount;
    }

    public Integer getRareCount() {
        return rareCount;
    }

    public void setRareCount(Integer rareCount) {
        this.rareCount = rareCount;
    }
}
