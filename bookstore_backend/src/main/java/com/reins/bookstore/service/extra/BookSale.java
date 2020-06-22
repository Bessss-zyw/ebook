package com.reins.bookstore.service.extra;

import com.reins.bookstore.entity.Book;

public class BookSale {
    int sale;
    Book book;

    public BookSale(int sale, Book book) {
        this.sale = sale;
        this.book = book;
    }

    public int getSale() {
        return sale;
    }

    public void setSale(int sale) {
        this.sale = sale;
    }

    public void addSale(int sale) {
        this.sale += sale;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public boolean match(int book_id) {
        return (this.book != null && this.book.getBookId() == book_id);
    }

    @Override
    public String toString() {
        return "BookSale{" +
                "sale=" + sale +
                ", book_id=" + book.getBookId() +
                '}';
    }
}
