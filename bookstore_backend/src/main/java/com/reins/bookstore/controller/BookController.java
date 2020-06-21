package com.reins.bookstore.controller;
import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.BookImage;
import com.reins.bookstore.service.BookService;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;


@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping("/getBooks")
    public List<Book> getBooks(@RequestBody Map<String, String> params) {
        return bookService.getBooks();
    }

    @RequestMapping("/getBook")
    public Book getBook(@RequestParam("id") Integer id){
        System.out.println("get book");
         return bookService.findBookById(id);
    }

    @RequestMapping("/modifyBook")
    public Msg modifyBook(@RequestBody Map<String, String> params){
        System.out.println(params);

        String str_id = params.get("id");
        String name = params.get(Constant.BOOK_NAME);
        String author = params.get(Constant.AUTHOR);
        String isbn = params.get(Constant.ISBN);
        String str_inv = params.get(Constant.INVENTORY);

        if (str_id == null)
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.MODIFY_BOOK_ERROR);

        int id = Integer.parseInt(str_id);
        Book book = bookService.findBookById(id);

        if (id == 0)
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.MODIFY_BOOK_ERROR);

        if (name != null) book.setName(name);
        if (author != null) book.setAuthor(author);
        if (isbn != null) book.setIsbn(isbn);
        if (str_inv != null) book.setInventory(Integer.parseInt(str_inv));

        bookService.modifyBook(book);
//        Book book = bookService.findBookById(book_id);
//        book.setAuthor(book_author);
//        book.setDescription(book_description);
//        book.setInventory(book_inventory);
//        book.setName(book_name);
//        book.setType(book_type);
//        book.setPrice(book_price);

//        bookService.modifyBook(book);

        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.MODIFY_BOOK_SUCCESS);
    }

    @RequestMapping("/modifyBookImage")
    public Msg modifyBookImage(@RequestParam("id") Integer id,
                               @RequestParam("base64") String base64){
        System.out.println(id);
        System.out.println(base64);

        if (!bookService.modifyBookImage(new BookImage(id, base64)))
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.MODIFY_BOOK_ERROR);

        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.MODIFY_BOOK_SUCCESS);
    }

    @RequestMapping("/newBook")
    public Msg newBook(@RequestParam("isbn") String isbn,
                       @RequestParam("name") String name,
                       @RequestParam("author") String author,
                       @RequestParam("type") String type,
                       @RequestParam("price") Double price,
                       @RequestParam("inv") Integer inv,
                       @RequestParam("description") String description){
        System.out.println("newBook");

        if (description.length() > 490)
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.ADD_BOOK_STRING_ERROR);

        Book book = new Book();
        book.setIsbn(isbn);
        book.setName(name);
        book.setType(type);
        book.setAuthor(author);
        book.setPrice(price);
        book.setDescription(description);
        book.setInventory(inv);
        book.setImage(Constant.NO_IMAGE);

        bookService.newBook(book);

        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.ADD_BOOK_SUCCESS);
    }

    @RequestMapping("/deleteBook")
    public Msg deleteBook(@RequestParam("id") Integer id){
        System.out.println("delete book");

        if (bookService.deleteBook(id))
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.DELETE_BOOK_SUCCESS);
        else
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.DELETE_BOOK_ERROR);
    }
//
//    @RequestMapping(value = "/uploadImage")
//    public Msg uploadImage(@RequestParam("id") Integer id,
//            @RequestParam(value = "avatar") MultipartFile avatar){
//        System.out.println(id);
//        System.out.println(avatar);
//        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
//    }
//


}
