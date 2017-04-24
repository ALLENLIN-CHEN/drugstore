package org.scut.mychart.service;

/**
 * Created by crh on 2017/3/2.
 */

import org.scut.mychart.model.CategoryConAvgModel;
import org.scut.mychart.model.CategoryTimesModel;
import org.scut.mychart.model.RareFreqModel;

import java.util.List;
import java.util.Map;

/**
 *与医保药店消费分析相关业务的接口定义
 */
public interface DrugStoreService {
    /**
     * 获取购药次数统计的数据
     * @return
     */
     public List<RareFreqModel> getPurchaseTimesData();

    /**
     * 获取各类别的购买人次的统计数据
     * @return
     */
    public Map<Integer,Object> getCatTimesData();

    /**
     * 获取消费金额数据
     * @return
     */
    public Map<String,Object> getConSum();
    /**
     * 获取各类别的平均消费金额的统计数据
     *
     * @return
     */
    public Map<Integer,Object> getCatConAvgData();
}
