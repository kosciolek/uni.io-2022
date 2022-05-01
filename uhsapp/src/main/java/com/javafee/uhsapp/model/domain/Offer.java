package com.javafee.uhsapp.model.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Offer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String title;
	@Column(name = "start_date")
	private String startDate;
	@Column(name = "end_date")
	private String endDate;
	@Column(name = "issuance_date")
	private String issuanceDate;
	private String description;
	@Column(name = "phone_number")
	private String phoneNumber;
	private String email;
	private EnumCategory category;
	private boolean needy;
	private boolean finished;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_user_data")
	private UserData userData;
}
