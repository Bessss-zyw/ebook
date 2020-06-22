package com.reins.bookstore;

import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.controller.*;
import com.reins.bookstore.dao.BookDao;
import com.reins.bookstore.dao.CartDao;
import com.reins.bookstore.dao.OrderDao;
import com.reins.bookstore.dao.UserDao;
import com.reins.bookstore.daoimpl.UserDaoImpl;
import com.reins.bookstore.entity.*;
import com.reins.bookstore.repository.*;
import com.reins.bookstore.service.BookService;
import com.reins.bookstore.service.CartService;
import com.reins.bookstore.service.OrderService;
import com.reins.bookstore.service.extra.BookSale;
import com.reins.bookstore.service.extra.UserConsume;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.Modifying;

import java.sql.Timestamp;
import java.util.*;

import static java.lang.Integer.parseInt;

@SpringBootTest
class BookstoreApplicationTests {

    @Autowired
    UserController userController;

    @Autowired
    OrderController orderController;

    @Autowired
    BookController bookController;

    @Autowired
    CartController cartController;

    @Autowired
    BookImageRepository bookImageRepository;

    @Autowired
    OrderService orderService;

    @Test
    public void test(){
        String time1 = "2020-2-05 16:16:57";
        String time2 = "2020-6-20 16:16:57";

        System.out.println(time1);
        System.out.println(time2);


//        List<UserConsume> userConsume = orderService.getUserConsume(time1, time2);
//
//        for (UserConsume user: userConsume
//             ) {
//            System.out.println(user);
//        }

        System.out.println("result: \n");

        List<BookSale> userReport = orderController.getBookSale(time1, time2);



        for (BookSale booksale: userReport) {
            System.out.println(booksale);
        }
    }









//
//    @Test
//    void contextLoads() {
////        System.out.println("orderController:");
////        System.out.println(orderController);
////        System.out.println("bookController:");
////        System.out.println(bookController);
////
////        System.out.println("orderController--bookService:");
////        System.out.println(orderController.getBookService());
////        System.out.println("bookController--bookService:");
////        System.out.println(bookController.getBookService());
//        String string = "  [1,2,31,4]";
//        System.out.println("string:" + string);
//        string = string.trim().substring(1).trim();
//        System.out.println("string:" + string);
//
//        while (string.length() > 0){
//            int i = 0;
//            while (string.charAt(i)>=48 && string.charAt(i)<=57) i++;
//
//            System.out.println(parseInt(string.substring(0,i)));
//            string = string.substring(i+1).trim();
//        }
//
//    }
//

}
