package org.scut.mychart.service.impl;


import org.scut.mychart.mapper.DrugStoreMapper;
import org.scut.mychart.model.CategoryConAvgModel;
import org.scut.mychart.model.CategoryTimesModel;
import org.scut.mychart.model.PurchaseCounterModel;
import org.scut.mychart.service.DrugStoreService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by crh on 2017/3/2.
 */
@Service("drugStoreService")
public class DrugStoreServiceImpl implements DrugStoreService{
    @Resource
    private DrugStoreMapper pharmacyMapper;
    @Override
    public List<PurchaseCounterModel> getPurchaseTiemsData() {
        return null;
    }

    @Override
    public List<CategoryTimesModel> getCatTimesData() {
        return null;
    }

    @Override
    public Map<String, Object> getConSum() {
        return null;
    }

    @Override
    public List<CategoryConAvgModel> getCatConAvgData() {
        return null;
    }
}
