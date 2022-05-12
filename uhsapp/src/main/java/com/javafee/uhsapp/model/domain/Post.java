package com.javafee.uhsapp.model.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String author;
	@NotNull
	private Category category;
	@NotNull
	@Column(name = "phone_number")
	private String phoneNumber;
	private String email;
	@NotNull
	private String address;
	@NotNull
	private String title;
	@NotNull
	private PostType type;
	private boolean finished;
	@Column(name = "creation_date")
	private Timestamp creationDate;
	@NotNull
	private String description;
	@NotNull
	@Column(name = "shortDescription")
	private String shortDescription;
	@NotNull
	@Column(name = "end_date")
	private Timestamp endDate;
	@OneToMany(mappedBy = "post")
	private List<Comment> comments;



	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_user_data")
	private UserData userData;
}
