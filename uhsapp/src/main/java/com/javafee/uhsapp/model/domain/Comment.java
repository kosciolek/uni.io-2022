package com.javafee.uhsapp.model.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String body;
    private String author;
    private Timestamp timestamp;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_post")
    private Post post;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_user_data" )
    private UserData userData;
}
