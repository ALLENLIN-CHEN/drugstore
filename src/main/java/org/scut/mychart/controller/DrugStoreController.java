package org.scut.mychart.controller;

/**
 * Created by crh on 2017/3/2.
 */
import org.apache.commons.collections.map.HashedMap;
import org.scut.mychart.model.PurchaseCounterModel;
import org.scut.mychart.model.RareFreqModel;
import org.scut.mychart.service.DrugStoreService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 医保药店消费分析系统控制器
 */
@Controller
@RequestMapping(value="/drugstore",produces="application/json;charset=UTF-8")
public class DrugStoreController {
  @Resource
  private DrugStoreService drugStoreService;
  @RequestMapping(value="/categorytimes")
  @ResponseBody
  public Map<Integer,Object> categoryTiems(Model m){return drugStoreService.getCatTimesData();}
  @RequestMapping(value="/categoryconavg")
  @ResponseBody
  public Map<Integer,Object> categoryConAvg(Model m){
    return drugStoreService.getCatConAvgData();
  }
  @RequestMapping(value="/timespeople")
  @ResponseBody
  public List<RareFreqModel> purcharePeople(Model m){
     return drugStoreService.getPurchaseTimesData();
  }
  @RequestMapping(value="/consum")
  @ResponseBody
  public Map<String,Object> conSum(Model m){
    return drugStoreService.getConSum();
  }
}
