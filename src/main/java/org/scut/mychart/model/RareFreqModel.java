package org.scut.mychart.model;

/**
 * Created by crh on 2017/3/23.
 */
public class RareFreqModel {
  private int year;//年份
    private int rare;//购药次数<=3的人数
    public RareFreqModel(int year,int rare,int freq){
        this.year = year;
        this.rare = rare;
        this.freq = freq;
    }
    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getRare() {
        return rare;
    }

    public void setRare(int rare) {
        this.rare = rare;
    }

    public int getFreq() {
        return freq;
    }

    public void setFreq(int freq) {
        this.freq = freq;
    }

    private int freq;//购药次数>3的人数
}
