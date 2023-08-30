package com.incubateur.codrive.configuration;

import org.mapstruct.factory.Mappers;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.incubateur.codrive.mapper.UserMapper;

@Configuration
public class MapConfiguration {
	
	
	@Bean
	public UserMapper userMapper() {
	    return Mappers.getMapper(UserMapper.class);
	    
	}
}
