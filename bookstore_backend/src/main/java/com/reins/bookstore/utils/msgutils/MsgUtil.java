package com.reins.bookstore.utils.msgutils;

import net.sf.json.JSONObject;

/**
 * @ClassName Msg
 * @Description TODO
 * @Author thunderBoy
 * @Date 2019/11/7 14:32
 */
public class MsgUtil {

    public static final int SUCCESS = 0;
    public static final int ERROR = -1;
    public static final int LOGIN_USER_ERROR = -100;
    public static final int NOT_LOGGED_IN_ERROR = -101;

    public static final String SUCCESS_MSG = "成功！";
    public static final String ERROR_MSG = "错误！";

    public static final String LOGIN_SUCCESS_MSG = "登录成功！";
    public static final String LOGIN_USER_ERROR_MSG = "用户名或密码错误，请重新输入！";
    public static final String NOT_LOGGED_IN_ERROR_MSG = "登录失效，请重新登录！";
    public static final String LOGIN_DISABLED = "您已被禁用，无法登陆！";

    public static final String LOGOUT_SUCCESS_MSG = "登出成功！";
    public static final String LOGOUT_ERR_MSG = "登出异常！";

    public static final String SIGN_UP_SUCCESS_MSG = "注册成功！";
    public static final String SIGN_UP_ERR_MSG = "注册失败！";
    public static final String SIGN_UP_USER_ERROR_MSG = "用户名已存在，请重新输入！";
    public static final String SIGN_UP_USER_SUCCESS_MSG = "用户名不存在，可以使用！";

    public static final String DISABLE_SUCCESS = "禁用成功！";
    public static final String DISABLE_ERROR = "禁用失败！";
    public static final String NON_DISABLE_SUCCESS = "解禁成功！";
    public static final String NON_DISABLE_ERROR = "解禁失败！";

    public static final String ADD_BOOK_SUCCESS = "新增图书成功！";
    public static final String ADD_BOOK_ERROR = "新增图书失败！";
    public static final String ADD_BOOK_STRING_ERROR = "图书文本信息过长，新增失败！";

    public static final String DELETE_BOOK_SUCCESS = "删除图书信息成功！";
    public static final String DELETE_BOOK_ERROR = "删除图书信息失败！";

    public static final String MODIFY_BOOK_SUCCESS = "修改图书信息成功！";
    public static final String MODIFY_BOOK_ERROR = "修改图书信息失败！";

    public static final String ADD_TO_CART_SUCCESS = "加入购物车成功！";
    public static final String ADD_TO_CART_ERROR = "加入购物车失败！";

    public static final String MAKE_ORDER_SUCCESS = "下订单成功！";
    public static final String MAKE_ORDER_ERROR = "下订单失败！";





    public static Msg makeMsg(MsgCode code, JSONObject data){
        return new Msg(code, data);
    }

    public static Msg makeMsg(MsgCode code, String msg, JSONObject data){
        return new Msg(code, msg, data);
    }

    public static Msg makeMsg(MsgCode code){
        return new Msg(code);
    }

    public static Msg makeMsg(MsgCode code, String msg){
        return new Msg(code, msg);
    }

    public static Msg makeMsg(int status, String msg, JSONObject data){
        return new Msg(status, msg, data);
    }

    public static Msg makeMsg(int status, String msg){
        return new Msg(status, msg);
    }
}
