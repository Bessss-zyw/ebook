package com.reins.bookstore.service;

import com.reins.bookstore.dao.UserDao;
import com.reins.bookstore.entity.User;
import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.entity.UserIcon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    /**
    * check the username and the password is right for sign in
    */
    public UserAuth checkUser(String username, String password){
        return userDao.checkUser(username,password);
    }

    /**
    * check if the name exists, if exists return true, else return false
    */
    public boolean checkName(String username) {
        return userDao.checkName(username);
    }


    /** get all the user information */
    public List<UserAuth> getAlluser(){
        return userDao.getAllAuth();
    }

    /**
     * get user information by its user_id
     * for all users
     */
    public User getUser(int user_id){
        return userDao.getUser(user_id);
    }

    /** get user icon by its user_id
     * for all users
     */
    public UserIcon getIcon(int user_id){
        return userDao.getUserIcon(user_id);
    }


    /**
    * register a new user (if the username does not exists
     * for all users
    */
    public UserAuth newUser(String username, String password,
                        String nickname, String email, String address, String tel,
                        Integer user_type, Integer ifDisabled){
        User user = new User();
        user.setNickname(nickname);
        user.setEmail(email);
        user.setTel(tel);
        user.setAddress(address);
        userDao.saveUser(user);

        UserAuth userAuth = new UserAuth();
        userAuth.setUserId(user.getUserId());
        userAuth.setPassword(password);
        userAuth.setUsername(username);
        userAuth.setUserType(user_type);
        userAuth.setIfDisabled(ifDisabled);
        userDao.saveUserAuth(userAuth);

        return userAuth;
    }


    /**
     * modify Customer disabled state
     * only for Admin
     */
    public boolean modifyState(int user_id, int disable){
        UserAuth userAuth = userDao.getUserAuth(user_id);
        if (userAuth == null) return false;

        userAuth.setIfDisabled(disable);
        userDao.saveUserAuth(userAuth);
        return true;
    };

    /**
     * modify user information
     * for all users
     */
    public boolean modifyInfo(User user){
        User user_get = userDao.getUser(user.getUserId());
        if (user_get == null) return false;

        userDao.saveUser(user);
        return true;
    };
}
