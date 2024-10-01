package com.qahub.api.domain.user;

public record DataListUser(
        Long id,
        String name,
        String email,
        Boolean active,
        Type type
) {
    public DataListUser(User user){
        this(user.getId(), user.getName(), user.getEmail(), user.getActive(), user.getType());
    }
}
