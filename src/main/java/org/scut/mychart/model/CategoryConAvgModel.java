package org.scut.mychart.model;

/**
 * Created by crh on 2017/3/2.
 */
public class CategoryConAvgModel {
    private Integer year;//时间:年份
    private double avg;//平均金额
    private String con;//类别

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public double getAvg() {
        return avg;
    }

    public void setAvg(double avg) {
        this.avg = avg;
    }

    public String getCon() {
        return con;
    }

    public void setCon(String con) {
        this.con = con;
    }
}
