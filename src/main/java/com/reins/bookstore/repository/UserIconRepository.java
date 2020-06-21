package com.reins.bookstore.repository;

import com.reins.bookstore.entity.UserIcon;
import org.springframework.data.mongodb.repository.MongoRepository;

//@RepositoryRestResource(collectionResourceRel = "personicon", path = "personicon")
public interface UserIconRepository extends MongoRepository<UserIcon, Integer> {
}
