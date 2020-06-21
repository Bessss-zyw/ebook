package com.reins.bookstore.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "userIcon")
public class UserIcon {

    @Id
    private int id;

    private String iconBase64;

    public UserIcon(int id, String iconBase64) {
        this.id = id;
        this.iconBase64 = iconBase64;
    }

    public String getIconBase64() {
        return iconBase64;
    }

    public void setIconBase64(String iconBase64) {
        this.iconBase64 = iconBase64;
    }

    @Override
    public String toString() {
        return "UserIcon{" +
                "id=" + id +
                ", iconBase64='" + iconBase64 + '\'' +
                "}\n";
    }
}
