package com.kob.backend.controller.pk;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

//如果想把这个函数变成一个链接对应的函数的话，需要加上一个注解叫controller
//我们这一个类里面所有的连接都是在pk目录下，每一个模块的链接应该都在某一个对应的目录下，pk模块应该都在./pk/里面
//父目录用RequestMapping
@Controller
public class IndexController {
    //里面对应的函数，比如我们想返回一个页面，我们需要先把这个页面创建出来
    //这个页面需要创建在resources的templates里面
    //每一个链接都要返回一个html页面，现在让我们的pk的index返回我们的index.html
    @RequestMapping("/")
    public String index(){
        //我们这里要写的是在templates里边，我们的index目录的一个路径
        return "pk/index.html";
    }
}

