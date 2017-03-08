package org.scut.mychart.model;

/**
 * Created by crh on 2017/3/2.
 */
public class CategoryConAvgModel {
    private Integer year;//时间:年份
    private Integer presDrugsAvg;// 购买处方药的人次
    private Integer nopresDrugsAvg;//购买非处方药的人次
    private Integer mediAppInsAvg;//购买医疗器械的人次
    private Integer healProsAvg;//购买保健品人次
    private Integer mkCosAvg;//购买“妆特字”化妆品人次
    private Integer disSuppAvg;//购买消毒用品的人次
    private Integer othersAvg;//购买其他的人次

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getPresDrugsAvg() {
        return presDrugsAvg;
    }

    public void setPresDrugsAvg(Integer presDrugsAvg) {
        this.presDrugsAvg = presDrugsAvg;
    }

    public Integer getNopresDrugsAvg() {
        return nopresDrugsAvg;
    }

    public void setNopresDrugsAvg(Integer nopresDrugsAvg) {
        this.nopresDrugsAvg = nopresDrugsAvg;
    }

    public Integer getMediAppInsAvg() {
        return mediAppInsAvg;
    }

    public void setMediAppInsAvg(Integer mediAppInsAvg) {
        this.mediAppInsAvg = mediAppInsAvg;
    }

    public Integer getHealProsAvg() {
        return healProsAvg;
    }

    public void setHealProsAvg(Integer healProsAvg) {
        this.healProsAvg = healProsAvg;
    }

    public Integer getMkCosAvg() {
        return mkCosAvg;
    }

    public void setMkCosAvg(Integer mkCosAvg) {
        this.mkCosAvg = mkCosAvg;
    }

    public Integer getDisSuppAvg() {
        return disSuppAvg;
    }

    public void setDisSuppAvg(Integer disSuppAvg) {
        this.disSuppAvg = disSuppAvg;
    }

    public Integer getOthersAvg() {
        return othersAvg;
    }

    public void setOthersAvg(Integer othersAvg) {
        this.othersAvg = othersAvg;
    }
}
