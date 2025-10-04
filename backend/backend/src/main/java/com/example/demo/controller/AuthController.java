package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
public class AuthController {

    // demo in-memory user store (teams can switch to Postgres)
    private static final Map<String, String> users = new ConcurrentHashMap<>();
    static {
        // password stored plaintext for simplicity (not for real apps) — in practice use bcrypt
        users.put("sadiq", "password123");
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body){
        String username = body.get("username");
        String password = body.get("password");
        if(username == null || password == null) {
            return Map.of("message", "Missing credentials");
        }
        if(!users.containsKey(username)) return Map.of("message", "User not found");
        if(!users.get(username).equals(password)) return Map.of("message", "Invalid password");
        return Map.of("message", "Login successful!");
    }

    @GetMapping("/")
    public String hello() {
        return "Backend running";
    }
}
