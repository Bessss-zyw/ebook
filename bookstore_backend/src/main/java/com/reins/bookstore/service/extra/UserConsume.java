package com.reins.bookstore.service.extra;

import com.reins.bookstore.entity.User;
import com.reins.bookstore.entity.UserAuth;

public class UserConsume {
    int bookNum;
    double expenditure;
    UserAuth userAuth;

    public UserConsume(int bookNum, double expenditure, UserAuth userAuth) {
        this.bookNum = bookNum;
        this.expenditure = expenditure;
        this.userAuth = userAuth;
    }

    public boolean match(int user_id) {
        return (this.userAuth != null && this.userAuth.getUserId() == user_id);
    }

    public int getBookNum() {
        return bookNum;
    }

    public void setBookNum(int books) {
        this.bookNum = books;
    }

    public void addBookNum(int books) {
        this.bookNum += books;
    }

    public double getExpenditure() {
        return expenditure;
    }

    public void setExpenditure(double expenditure) {
        this.expenditure = expenditure;
    }

    public void addExpenditure(double expenditure) {
        this.expenditure += expenditure;
    }

    public UserAuth getUser() {
        return userAuth;
    }

    public void setUser(UserAuth userAuth) {
        userAuth.setPassword("");
        this.userAuth = userAuth;
    }

    @Override
    public String toString() {
        return "UserConsume{" +
                "bookNum=" + bookNum +
                ", expenditure=" + expenditure +
                ", user_id=" + userAuth.getUserId() +
                '}';
    }
}
