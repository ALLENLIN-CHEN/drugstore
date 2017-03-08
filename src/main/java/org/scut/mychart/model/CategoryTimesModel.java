package org.scut.mychart.model;

/**
 * Created by crh on 2017/3/2.
 */
public class CategoryTimesModel {
    private Integer year;//时间:年份
    private Integer presDrugs;// 购买处方药的人次
    private Integer nopresDrugs;//购买非处方药的人次
    private Integer mediAppIns;//购买医疗器械的人次
    private Integer healPros;//购买保健品人次
    private Integer mkCos;//购买“妆特字”化妆品人次
    private Integer disSupp;//购买消毒用品的人次
    private Integer others;//购买其他的人次

    public Integer getPresDrugs() {
        return presDrugs;
    }

    public void setPresDrugs(Integer presDrugs) {
        this.presDrugs = presDrugs;
    }

    public Integer getNopresDrugs() {
        return nopresDrugs;
    }

    public void setNopresDrugs(Integer nopresDrugs) {
        this.nopresDrugs = nopresDrugs;
    }

    public Integer getMediAppIns() {
        return mediAppIns;
    }

    public void setMediAppIns(Integer mediAppIns) {
        this.mediAppIns = mediAppIns;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getHealPros() {

        return healPros;
    }

    public void setHealPros(Integer healPros) {
        this.healPros = healPros;
    }

    public Integer getMkCos() {
        return mkCos;
    }

    public void setMkCos(Integer mkCos) {
        this.mkCos = mkCos;
    }

    public Integer getDisSupp() {
        return disSupp;
    }

    public void setDisSupp(Integer disSupp) {
        this.disSupp = disSupp;
    }

    public Integer getOthers() {
        return others;
    }

    public void setOthers(Integer others) {
        this.others = others;
    }
}
