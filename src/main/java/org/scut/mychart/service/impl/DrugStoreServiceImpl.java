package org.scut.mychart.service.impl;


import org.scut.mychart.mapper.DrugStoreMapper;
import org.scut.mychart.model.*;
import org.scut.mychart.service.DrugStoreService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by crh on 2017/3/2.
 */
@Service("drugStoreService")
public class DrugStoreServiceImpl implements DrugStoreService{
    @Resource
    private DrugStoreMapper drugStoreMapper;
    @Override
    public List<RareFreqModel> getPurchaseTimesData(){
        List<PurchaseCounterModel> rareList = drugStoreMapper.selectRarePurchaseData();
        List<PurchaseCounterModel> freqList = drugStoreMapper.selectFreqPurchaseData();
        List<RareFreqModel> res = new ArrayList<RareFreqModel>();
        PurchaseCounterModel r = null;
        PurchaseCounterModel f = null;
        for(int i=0;i<rareList.size()&&i<freqList.size();i++){
            r = rareList.get(i);
            f = freqList.get(i);
            //may some check needed here
            res.add(new RareFreqModel(r.getYear(),r.getTotal(),f.getTotal()));
        }
        return res;
    }
    @Override
    public Map<Integer,Object> getCatTimesData() {
        List<CategoryTimesModel> list = drugStoreMapper.selectCatTimesList();
        int year = -1;
        Map<Integer,Object> res = new HashMap();
        Map<String,Integer> item = null;
        for(CategoryTimesModel m:list){
            if(year!=m.getYear()){
                item = new HashMap<String,Integer>();
                res.put(m.getYear(),item);
            }
            year = m.getYear();
            item.put("item"+m.getCon(),m.getNum());
        }
        return res;
    }

    @Override
    public Map<String, Object> getConSum() {
        List<SumModel> sumList = drugStoreMapper.selectSumList();
        Map<String,Object> res = new HashMap<String,Object>();
        res.put("consum",sumList);
        return res;
    }

    @Override
    public Map<Integer,Object> getCatConAvgData() {
        List<CategoryConAvgModel> list = drugStoreMapper.selectCatConAvgList();
        int year = -1;
        Map<Integer,Object> res = new HashMap();
        Map<String,Double> item=null;
        for(CategoryConAvgModel m:list){
            if(year!=m.getYear()){
                item = new HashMap<String,Double>();
                res.put(m.getYear(),item);
            }
            year = m.getYear();
            item.put("item"+m.getCon(),m.getAvg());
        }
        return res;
    }
}
