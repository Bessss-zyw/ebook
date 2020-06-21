package com.reins.bookstore.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookImage")
public class BookImage {

    @Id
    private int id;

    private String imgBase64;


    public BookImage(int id, String imgBase64) {
        this.id = id;
        this.imgBase64 = imgBase64;
    }

    public int getId() {
        return id;
    }

    public String getImgBase64() {
        return imgBase64;
    }

    public void setImgBase64(String imgBase64) {
        this.imgBase64 = imgBase64;
    }

    @Override
    public String toString() {
        return "BookImage{" +
                "id=" + id +
                ", imgBase64='" + imgBase64 + '\'' +
                '}';
    }
}
