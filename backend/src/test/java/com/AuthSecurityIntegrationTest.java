package com;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
class AuthSecurityIntegrationTest {
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper objectMapper;

    @Test
    void registrationLoginAndProtectedApiWork() throws Exception {
        String email = "demo." + UUID.randomUUID() + "@tsdcem.ac.in";
        String registration = """
                {"name":"Demo Student","email":"%s","password":"CampusDemo123","department":"IT","year":"First Year","division":"A"}
                """.formatted(email);

        String registered = mvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON).content(registration))
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();
        JsonNode registrationJson = objectMapper.readTree(registered);
        String token = registrationJson.path("token").asText();
        assertFalse(token.isBlank());
        assertEquals("STUDENT", registrationJson.path("user").path("role").asText());

        mvc.perform(get("/api/posts")).andExpect(status().isUnauthorized());
        mvc.perform(get("/api/posts").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());

        String login = """
                {"email":"%s","password":"CampusDemo123"}
                """.formatted(email);
        mvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(login))
                .andExpect(status().isOk());

        String invalidLogin = """
                {"email":"%s","password":"wrong-password"}
                """.formatted(email);
        mvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(invalidLogin))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void studentCannotAccessAdminOrFacultyOperations() throws Exception {
        String email = "roles." + UUID.randomUUID() + "@tsdcem.ac.in";
        String registration = """
                {"name":"Role Test","email":"%s","password":"CampusDemo123"}
                """.formatted(email);
        String response = mvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON).content(registration))
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();
        String token = objectMapper.readTree(response).path("token").asText();
        mvc.perform(post("/api/assignments").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON).content("{}"))
                .andExpect(status().isForbidden());
    }

    @Test
    void authenticatedPostCrudPersistsAcrossReads() throws Exception {
        String email = "crud." + UUID.randomUUID() + "@tsdcem.ac.in";
        String registration = """
                {"name":"CRUD Student","email":"%s","password":"CampusDemo123"}
                """.formatted(email);
        String authResponse = mvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON).content(registration))
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();
        String token = objectMapper.readTree(authResponse).path("token").asText();

        String created = mvc.perform(post("/api/posts").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Persisted post\",\"content\":\"Saved in JPA\",\"category\":\"General\"}"))
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();
        long id = objectMapper.readTree(created).path("id").asLong();
        mvc.perform(get("/api/posts/" + id).header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());

        mvc.perform(put("/api/posts/" + id).header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Updated persisted post\",\"content\":\"Updated\",\"category\":\"Academics\"}"))
                .andExpect(status().isOk());
        String reread = mvc.perform(get("/api/posts/" + id).header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        assertEquals("Updated persisted post", objectMapper.readTree(reread).path("title").asText());

        mvc.perform(delete("/api/posts/" + id).header("Authorization", "Bearer " + token))
                .andExpect(status().isNoContent());
        mvc.perform(get("/api/posts/" + id).header("Authorization", "Bearer " + token))
                .andExpect(status().isNotFound());
    }
}
