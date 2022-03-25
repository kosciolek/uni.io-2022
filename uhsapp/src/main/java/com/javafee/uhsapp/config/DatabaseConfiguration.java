package com.javafee.uhsapp.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EntityScan(basePackages = "com.javafee.uhsapp.model")
public class DatabaseConfiguration {
}
