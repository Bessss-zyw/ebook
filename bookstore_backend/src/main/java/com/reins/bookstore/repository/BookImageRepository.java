package com.reins.bookstore.repository;

import com.reins.bookstore.entity.BookImage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookImageRepository extends MongoRepository<BookImage, Integer> {
}
