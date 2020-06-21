package com.reins.bookstore.daoimpl;

import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.dao.UserDao;
import com.reins.bookstore.entity.User;
import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.entity.UserIcon;
import com.reins.bookstore.repository.UserAuthRepository;
import com.reins.bookstore.repository.UserIconRepository;
import com.reins.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    UserAuthRepository userAuthRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private UserIconRepository userIconRepository;



    @Override
    public UserAuth checkUser(String username, String password){
        return userAuthRepository.checkUser(username,password);
    }

    @Override
    public boolean checkName(String username){
        UserAuth userAuth = userAuthRepository.checkName(username);

        if (userAuth == null) return false;
        else return true;
    }

    @Override
    public boolean checkId(int user_id){
        if (userRepository.getUser(user_id) == null) return false;
        else return true;
    }


    @Override
    public List<UserAuth> getAllAuth(){
        return userAuthRepository.findAll();
    }

    @Override
    public User getUser(int user_id){
        User user =  userRepository.getUser(user_id);
        if (user == null) return null;

        Optional<UserIcon> icon = userIconRepository.findById(user_id);
        if (icon.isPresent()){
            System.out.println("Icon Not Null " + user_id);
            user.setIcon(icon.get());
        }
        else{
            user.setIcon(null);
            System.out.println("Icon is Null");
        }
        return user;
    }

    @Override
    public UserAuth getUserAuth(int user_id){
        return userAuthRepository.getUserAuth(user_id);
    };



    @Override
    public UserIcon getUserIcon(Integer id){
        return userIconRepository.findById(id).get();
    }

    @Override
    public void saveUser(User user){
        userRepository.save(user);
    };

    @Override
    public void saveUserAuth(UserAuth userAuth){
        userAuthRepository.save(userAuth);
    };

//    @Override
//    public User newUser(String username, String password, String nickname,
//             String email, String address, String tel, Integer type){
//        User user = new User();
//        user.setNickname(nickname);
//        user.setEmail(email);
//        user.setTel(tel);
//        user.setAddress(address);
//        userRepository.save(user);
//
//        UserAuth userAuth = new UserAuth();
//        userAuth.setUserId(user.getUserId());
//        userAuth.setPassword(password);
//        userAuth.setUsername(username);
//        userAuth.setUserType(type);
//        userAuthRepository.save(userAuth);
//
//        return user;
//    };



//    @Override
//    public void modifyState(int user_id, int disable){
//        UserAuth userAuth = userAuthRepository.getUserAuth(user_id);
//        userAuth.setIfDisabled(disable);
//        userAuthRepository.save(userAuth);
//    };
//
//    @Override
//    public void modifyInfo(User user){
//        userRepository.save(user);
//    };


}
