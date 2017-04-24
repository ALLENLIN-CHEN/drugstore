package org.scut.mychart.model;

/**
 * Created by crh on 2017/3/2.
 */
public class CategoryTimesModel {
    private Integer year;//时间:年份
    private Integer num;//购买人次
    private String con;//购买类别

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public String getCon() {
        return con;
    }

    public void setCon(String con) {
        this.con = con;
    }
}
