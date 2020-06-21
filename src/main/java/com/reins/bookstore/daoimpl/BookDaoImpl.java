package com.reins.bookstore.daoimpl;

import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.dao.BookDao;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.BookImage;
import com.reins.bookstore.entity.UserIcon;
import com.reins.bookstore.repository.BookImageRepository;
import com.reins.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookImageRepository bookImageRepository;

    @Override
    public Book findOne(int id){
        Book book = bookRepository.getBookById(id);
        if (book == null) return null;

        Optional<BookImage> icon = bookImageRepository.findById(id);
        if (icon.isPresent()){
            System.out.println("Image Not Null " + id);
            book.setBase64(icon.get());
        }
        else{
            book.setBase64(null);
            System.out.println("Image is Null");
        }

        return book;
    }

    @Override
    public List<Book> getBooks() {
        List<Book> books = bookRepository.getBooks();

        for (Book book: books) {
            int id = book.getBookId();
            Optional<BookImage> icon = bookImageRepository.findById(id);
            if (icon.isPresent()){
                System.out.println("Image Not Null " + id);
                book.setBase64(icon.get());
            }
            else{
                book.setBase64(null);
                System.out.println("Image is Null");
            }
        }

        return books;
    }

    @Override
    public void saveBook(Book book){
        bookRepository.save(book);
    };

    @Override
    public void saveBookImage(BookImage bookImage){
        bookImageRepository.save(bookImage);
    };

    @Override
    public void removeBookAndImage(Book book){
        Optional<BookImage> image = bookImageRepository.findById(book.getBookId());
        if (image.isPresent()) bookImageRepository.delete(image.get());

        bookRepository.delete(book);
    };

//
//    @Override
//    public void modifyBook(Book book){
//        bookRepository.save(book);
//    }
//
//    @Override
//    public boolean modifyImg(int id, String base64){
//        System.out.println("modifyImg");
//        Book book = bookRepository.getBookById(id);
//        if (book == null) return false;
//
//        BookImage bookImage = new BookImage(id, base64);
//        bookImageRepository.save(bookImage);
//        book.setImage(Constant.USE_BASE64);
//        bookRepository.save(book);
//        return true;
//    };

}
