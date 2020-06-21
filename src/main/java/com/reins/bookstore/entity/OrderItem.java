package com.reins.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.Proxy;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Proxy(lazy = false)
@Table(name = "order_items")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "order_item_id")
public class OrderItem {

    @Id
    @Column(name = "id")
    private int order_item_id;

    private int order_id;
    private int book_id;
    private int num;
    private Double book_price;
    private String book_name;

    public OrderItem() {
    }

    public OrderItem(int order_id, int book_id, String book_name, int num, Double book_price) {
        this.order_id = order_id;
        this.book_id = book_id;
        this.book_name = book_name;
        this.num = num;
        this.book_price = book_price;
    }

    public int getOrder_id() {
        return order_id;
    }

    public void setOrder_id(int order_id) {
        this.order_id = order_id;
    }

    public int getOrder_item_id() {
        return order_item_id;
    }

    public void setOrder_item_id(int order_item_id) {
        this.order_item_id = order_item_id;
    }

    public int getBook_id() {
        return book_id;
    }

    public void setBook_id(int book_id) {
        this.book_id = book_id;
    }

    public String getBook_name() {
        return book_name;
    }

    public void setBook_name(String book_name) {
        this.book_name = book_name;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public Double getBook_price() {
        return book_price;
    }

    public void setBook_price(Double book_price) {
        this.book_price = book_price;
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "order_item_id=" + order_item_id +
                ", order_id=" + order_id +
                ", book_id=" + book_id +
                ", num=" + num +
                ", book_price=" + book_price +
                ", book_name='" + book_name + '\'' +
                "}\n";
    }
}
