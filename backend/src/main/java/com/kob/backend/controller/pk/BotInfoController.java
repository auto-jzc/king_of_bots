package com.kob.backend.controller.pk;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

//如果想返回数据的话，这里就要用RestController
//我们这一个类里面所有的链接都是在pk目录下，每一个模块的链接应该都在某一个对应的目录下，pk模块应该都在/pk/里面
//父目录用RequestMapping,加上一个映射
@RestController
@RequestMapping("/pk/")
public class BotInfoController {

    //前端链接对应的就是一个函数名http://localhost:8080/pk/getbotinfo/，链接对应访问那个函数，它是通过RestController一层一层找出来的
    @RequestMapping("getbotinfo/")

    //想返回一个字符串
//    public String getBotInfo(){
//        return "hhhhh";
//    }

    //返回一个链表
//    public List<String> getBotInfo(){
//        List<String> list=new LinkedList<>();
//        list.add("sword");
//        list.add("tiger");
//        list.add("apple");
//        return list;
//    }

    //返回一个字典
//    public Map<String,String> getBotInfo(){
//        Map<String,String> map=new HashMap<>();
//        map.put("name","tiger");
//        map.put("rating","1500");
//        return map;
//    }

    //嵌套
    public Map<String,String> getBotInfo(){
        Map<String,String> bot1=new HashMap<>();
        bot1.put("name","tiger");
        bot1.put("rating","1500");
        return bot1;
    }
}
