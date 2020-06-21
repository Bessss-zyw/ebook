package com.reins.bookstore.controller;

import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.entity.User;
import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.service.UserService;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import com.reins.bookstore.utils.sessionutils.SessionUtil;
import net.sf.json.JSONObject;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;
import java.util.Map;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    //public Msg login(@RequestParam(Constant.USERNAME) String username, @RequestParam(Constant.PASSWORD) String password, @RequestParam(Constant.REMEMBER_ME) Boolean remember){
    public Msg login(@RequestBody Map<String, String> params){
        System.out.println("login");
        String username = params.get(Constant.USERNAME);
        String password = params.get(Constant.PASSWORD);
        System.out.println(username);
        System.out.println(password);

        UserAuth auth = userService.checkUser(username, password);
        if(auth != null && auth.getIfDisabled() == 0){

            JSONObject obj = new JSONObject();
            obj.put(Constant.USER_ID, auth.getUserId());
            obj.put(Constant.USERNAME, auth.getUsername());
            obj.put(Constant.USER_TYPE, auth.getUserType());
            SessionUtil.setSession(obj);

            JSONObject data = JSONObject.fromObject(auth);
            data.remove(Constant.PASSWORD);

            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGIN_SUCCESS_MSG, data);
        }
        else if (auth != null) return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGIN_DISABLED);
        else return MsgUtil.makeMsg(MsgCode.LOGIN_USER_ERROR);
    }

    @RequestMapping("/addUser")
    public Msg signUp(@RequestBody Map<String, String> params){
        System.out.println("new User\n");

        String username = params.get(Constant.USERNAME);
        if(userService.checkName(username))
            return MsgUtil.makeMsg(MsgUtil.ERROR, MsgUtil.SIGN_UP_USER_ERROR_MSG);

        String password = params.get(Constant.PASSWORD);
        String nickname = params.get(Constant.NICKNAME);
        String email = params.get(Constant.EMAIL);
        String address = params.get(Constant.ADDR);
        String tel = params.get(Constant.TEL);

        UserAuth userAuth = userService.newUser(username, password,
                nickname, email, address, tel,
                Constant.CUSTOMER, Constant.NON_DISABLED);

        if (userAuth == null) return  MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.SIGN_UP_ERR_MSG);

        JSONObject data = JSONObject.fromObject(userAuth);
//        data.remove(Constant.PASSWORD);
        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SIGN_UP_SUCCESS_MSG, data);
    }

    @RequestMapping("/logout")
    public Msg logout(){
        Boolean status = SessionUtil.removeSession();

        if(status){
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGOUT_SUCCESS_MSG);
        }
        return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.LOGOUT_ERR_MSG);
    }

    @RequestMapping("/checkName")
    public Msg checkName(@RequestParam(Constant.USERNAME) String username){
        boolean flag = userService.checkName(username);
        JSONObject data = JSONObject.fromObject(flag);

        if(flag) return MsgUtil.makeMsg(MsgUtil.ERROR, MsgUtil.SIGN_UP_USER_ERROR_MSG);
        else return MsgUtil.makeMsg(MsgUtil.SUCCESS, MsgUtil.SIGN_UP_USER_SUCCESS_MSG);
    }

    @RequestMapping("/checkSession")
    public Msg checkSession(){
        JSONObject auth = SessionUtil.getAuth();

        if(auth == null){
            return MsgUtil.makeMsg(MsgCode.NOT_LOGGED_IN_ERROR);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGIN_SUCCESS_MSG, auth);
        }
    }
}
