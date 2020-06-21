package com.reins.bookstore.dao;

import com.reins.bookstore.entity.User;
import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.entity.UserIcon;

import java.util.List;

public interface UserDao {

    UserAuth checkUser(String username, String password);
    boolean checkName(String username);
    boolean checkId(int user_id);

    List<UserAuth> getAllAuth();
    User getUser(int user_id);
    UserAuth getUserAuth(int user_id);
    UserIcon getUserIcon(Integer id);

    void saveUser(User user);
    void saveUserAuth(UserAuth userAuth);
//    void modifyState(int user_id, int disable);
//    void modifyInfo(User user);
}
