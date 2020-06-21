package com.reins.bookstore.dao;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.BookImage;

import java.util.List;

public interface BookDao {
    Book findOne(int id);
    List<Book> getBooks();

    void saveBook(Book book);
    void saveBookImage(BookImage bookImage);

    void removeBookAndImage(Book book);
}
