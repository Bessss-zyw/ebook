package com.reins.bookstore.service;

import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.dao.BookDao;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.BookImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookDao bookDao;

    public Book findBookById(Integer id){
        return bookDao.findOne(id);
    }

    public List<Book> getBooks() {
        return bookDao.getBooks();
    }

    public void modifyBook(Book book){
        bookDao.saveBook(book);
    }

    public boolean modifyBookImage(BookImage bookImage){
        Book book = bookDao.findOne(bookImage.getId());
        if (book == null) return false;

        bookDao.saveBookImage(bookImage);

        book.setImage(Constant.USE_BASE64);
        bookDao.saveBook(book);
        return true;
    }

    public void newBook(Book book){
        bookDao.saveBook(book);
    }

    public boolean deleteBook(int id){
        Book book = bookDao.findOne(id);
        if (book == null) return false;

        bookDao.removeBookAndImage(book);
        return true;
    }
}

