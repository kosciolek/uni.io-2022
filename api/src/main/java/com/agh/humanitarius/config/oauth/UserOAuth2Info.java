package com.agh.humanitarius.config.oauth;

import java.util.Map;

public class UserOAuth2Info {
    private Map<String, Object> attributes;

    public UserOAuth2Info(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public String getId() {
        return (String) attributes.get("sub");
    }

    public String getName() {
        return (String) attributes.get("name");
    }

    public String getEmail() {
        return (String) attributes.get("email");
    }
}
