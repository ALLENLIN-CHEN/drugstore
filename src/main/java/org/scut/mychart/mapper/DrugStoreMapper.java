package org.scut.mychart.mapper;

import org.scut.mychart.model.CategoryConAvgModel;
import org.scut.mychart.model.CategoryTimesModel;
import org.scut.mychart.model.PurchaseCounterModel;
import org.scut.mychart.model.SumModel;

import java.util.List;
import java.util.Map;

/**
 * Created by crh on 2017/3/2.
 */
public interface DrugStoreMapper {
    /**
     * 获取购药次数<=3统计的数据
     * @return
     */
     public List<PurchaseCounterModel> selectRarePurchaseData();
    /**
     * 获取购药次数>3统计的数据
     * @return
     */
    public List<PurchaseCounterModel> selectFreqPurchaseData();

    /**
     * 获取各类别的购买人次的统计数据
     * @return
     */
    public List<CategoryTimesModel> selectCatTimesList();

    /**
     * 获取消费金额数据
     * @return
     */
    public Map<String,Object> selectConSumList();
    /**
     * 获取各类别的平均消费金额的统计数据
     *
     * @return
     */
    public List<CategoryConAvgModel> selectCatConAvgList();
    /*
    * 获取购药总金额数据
    * */
    public List<SumModel> selectSumList();
}
