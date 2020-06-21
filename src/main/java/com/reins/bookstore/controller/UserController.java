package com.reins.bookstore.controller;

import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.entity.User;
import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.entity.UserIcon;
import com.reins.bookstore.service.UserService;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import com.reins.bookstore.utils.sessionutils.SessionUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/disable")
    public Msg disable(@RequestParam("user_id") int user_id){
        boolean flag = userService.modifyState(user_id, Constant.DISABLED);
        if (flag)   // if disabled successfully
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.DISABLE_SUCCESS);
        else return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.DISABLE_ERROR);

    }


    @RequestMapping("/able")
    public Msg able(@RequestParam("user_id") int user_id){
        boolean flag = userService.modifyState(user_id, Constant.NON_DISABLED);
        if (flag)   // if able successfully
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.NON_DISABLE_SUCCESS);
        else return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.NON_DISABLE_ERROR);

    }


    @RequestMapping("/getAllUser")
    public List<UserAuth> getAllUser(@RequestBody Map<String, String> params){
        List<UserAuth> allUser = userService.getAlluser();
        for (UserAuth item: allUser) {
            item.setPassword("");
//            System.out.println(item);
        }
        return allUser;
    }


    @RequestMapping("/getUserInfo")
    public User getUserInfo(@RequestParam("user_id") int user_id){
        return userService.getUser(user_id);
    }


    @RequestMapping("/getIcon")
    public UserIcon getUserIcon(@RequestParam("user_id") int user_id){
        return userService.getIcon(user_id);
    }


//    public UserAuth checkUser(@RequestParam("username") String username,@RequestParam("password") String password){
//        return userService.checkUser(username, password);
//    }

}
