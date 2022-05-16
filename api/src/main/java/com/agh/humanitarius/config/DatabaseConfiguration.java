package com.agh.humanitarius.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EntityScan(basePackages = "com.agh.humanitarius.model")
public class DatabaseConfiguration {
}
