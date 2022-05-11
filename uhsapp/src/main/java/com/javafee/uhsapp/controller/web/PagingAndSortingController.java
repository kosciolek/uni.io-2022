package com.javafee.uhsapp.controller.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.Page;

public class PagingAndSortingController {
	protected Map<String, Object> prepareResponseMap(Page page) {
		Map<String, Object> response = new HashMap<>();
		response.put("data", page.getContent());
		response.put("currentPage", page.getNumber());
		response.put("totalItems", page.getTotalElements());
		response.put("totalPages", page.getTotalPages());
		return response;
	}
}