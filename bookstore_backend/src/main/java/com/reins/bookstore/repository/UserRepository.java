package com.reins.bookstore.repository;

import com.reins.bookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User,String> {

    @Query("from User where userId = ?1")
    User getUser(int user_id);
}
