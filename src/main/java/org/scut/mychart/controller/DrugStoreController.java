package org.scut.mychart.controller;

/**
 * Created by crh on 2017/3/2.
 */
import org.scut.mychart.service.DrugStoreService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * 医保药店消费分析系统控制器
 */
@Controller
@RequestMapping(value="/drugStore",produces="application/json;charset=UTF-8")
public class DrugStoreController {
  @Resource
  private DrugStoreService drugStoreService;
  @RequestMapping(value="/categorytimes")
  @ResponseBody
  public String categoryTiems(Model m){
      String str="{{year:'2011',freq:'200',rare:'300'},{year:'2013',freq:'400',rare:'400'}}";
    return str;
  }
  @RequestMapping(value="/categoryconavg")
  @ResponseBody
  public String categoryConAvg(Model m){
        return "categoryconavg";
  }
  @RequestMapping(value="/purchasetimes")
  @ResponseBody
  public String purchareTimes(Model m){
        return "purchasetimes";
  }
  @RequestMapping(value="/consum")
  @ResponseBody
  public Map<String,Object> conSum(Model m){
        //add service support
        Map<String,Object> res = new HashMap<String,Object>();
        int arr[] = {1,2,3,4,5};
        res.put("res",arr);
        return res;
  }
}
