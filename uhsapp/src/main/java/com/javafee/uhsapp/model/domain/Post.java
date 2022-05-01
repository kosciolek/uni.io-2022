package com.javafee.uhsapp.model.domain;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
	private Category category;
	@Column(name = "phone_number")
	private String phoneNumber;
	private String email;
	private String address;
	private String title;
	private PostType type;
	private boolean finished;
	@Column(name = "creation_date")
	private long creationDate;
	private String description;
	@Column(name = "shortDescription")
	private String shortDescription;
	@Column(name = "end_date")
	private long endDate;
	@OneToMany(mappedBy = "post",
			cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Comment> comments;



	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_user_data")
	private UserData userData;
}
