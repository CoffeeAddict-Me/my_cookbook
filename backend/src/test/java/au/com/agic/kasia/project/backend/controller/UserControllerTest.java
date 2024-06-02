package au.com.agic.kasia.project.backend.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import au.com.agic.kasia.project.backend.models.UserDetails;
import au.com.agic.kasia.project.backend.services.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UserControllerTest {

    @InjectMocks
    private UserController underTestUserController;

    @Mock
    private UserService service;

    private AutoCloseable closeable;

    @BeforeEach
    public void setupMocks() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    public void releaseMocks() throws Exception {
        closeable.close();
    }

    @Test
    @DisplayName("getAllUsers")
    public void testGetAllUsers() throws Exception {
        // Given
        List<UserDetails> expectedUsers = new ArrayList<>();
        when(service.findAllUsers()).thenReturn(expectedUsers);

        // When
        ResponseEntity<List<UserDetails>> response = underTestUserController.getAllUsers();

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());  // Check the response status
        assertEquals(expectedUsers, response.getBody());  // Check the response body
        verify(service).findAllUsers();  // Verify service interaction
    }

    @Test
    @DisplayName("getUserById")
    public void testGetUserById() throws Exception {
        //Given
        int id = 1;
        UserDetails expectedUser = new UserDetails();
        when(service.findUserById(id)).thenReturn(expectedUser);

        //When
        ResponseEntity<UserDetails> response = underTestUserController.getUserById(id);

        //Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedUser, response.getBody());
        verify(service).findUserById(id);
    }

    @Test
    @DisplayName("getUserByUsername")
    public void testGetUserByUsername() throws Exception {
        //Given
        String username = "testUsername";
        UserDetails expectedUser = new UserDetails();
        when(service.findUserByUsername(username)).thenReturn(expectedUser);

        //When
        ResponseEntity<UserDetails> response = underTestUserController.getUserByUsername(username);

        //Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedUser, response.getBody());
        verify(service).findUserByUsername(username);
    }

    @Test
    @DisplayName("checkForExistingUser when user exists")
    public void testCheckForExistingUser_UserExists() {
        // Given
        String username = "testUsername";
        UserDetails expectedUser = new UserDetails();
        when(service.checkForExistingUser(username)).thenReturn(Optional.of(expectedUser));

        // When
        ResponseEntity<?> response = underTestUserController.checkForExistingUser(username);

        // Then
        assertEquals("Username already taken", response.getBody(), "Response should indicate username is taken");
        assertEquals(200, response.getStatusCodeValue(), "HTTP status code should be 200");
    }

    @Test
    @DisplayName("checkForExistingUser when user doesn't exists")
    public void testCheckForExistingUser_UserNotExists() {
        // Given
        String username = "testUsername";
        when(service.checkForExistingUser(username)).thenReturn(Optional.empty());

        // When
        ResponseEntity<?> response = underTestUserController.checkForExistingUser(username);

        // Then
        assertEquals("Username is available", response.getBody(), "Response should indicate username is available");
        assertEquals(200, response.getStatusCodeValue(), "HTTP status code should be 200");
    }

    @Test
    @DisplayName("deleteUser")
    public void testDeleteUser() {
        //Given
        int id = 1;

        // Do nothing when service.deleteUser is called since it's a void method.
        doNothing().when(service).deleteUser(id);

        //When
        ResponseEntity<?> response = underTestUserController.deleteUser(id);

        //Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(service).deleteUser(id);
    }

    @Test
    @DisplayName("addUser")
    public void testAddUser() {
        // Given
        UserDetails newUser = new UserDetails();
        newUser.setName("Test User");
        newUser.setUsername("testUsername");
        newUser.setEmail("test@email.com");
        newUser.setPassword("testPassword");

        when(service.addUser(any(UserDetails.class))).thenReturn(newUser);

        // When
        ResponseEntity<?> response = underTestUserController.addUser(newUser);

        // Then
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertTrue(response.getBody() instanceof UserDetails);
        UserDetails returnedUser = (UserDetails) response.getBody();
        assertEquals(newUser, returnedUser);

        // Verify that the service method was called exactly once with the newUser
        verify(service).addUser(newUser);
    }




    @Test
    @DisplayName("updateUser when user exists from controller")
    public void testUpdateUser_UserExists() {
        // Given
        Integer userId = 1;
        UserDetails originalUser = new UserDetails();
        originalUser.setUserId(userId);
        originalUser.setName("Old Name");
        originalUser.setUsername("OldUsername");
        originalUser.setEmail("old@email.com");
        originalUser.setPassword("oldPassword");

        UserDetails updatedUser = new UserDetails();
        updatedUser.setName("New Name");
        updatedUser.setUsername("NewUsername");
        updatedUser.setEmail("new@email.com");
        updatedUser.setPassword("newPassword");

        when(service.findUserById(userId)).thenReturn(originalUser);
        when(service.saveUser(any(UserDetails.class))).thenReturn(updatedUser);

        // When
        ResponseEntity<UserDetails> response = underTestUserController.updateUser(userId, updatedUser);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedUser, response.getBody());
        verify(service).saveUser(any(UserDetails.class));
    }

    @Test
    @DisplayName("test updateUser when user was not found from controller")
    public void testUpdateUser_UserNotFound() {
        // Given
        Integer userId = 1;
        UserDetails updatedUser = new UserDetails();
        when(service.findUserById(userId)).thenReturn(null);

        // When
        ResponseEntity<UserDetails> response = underTestUserController.updateUser(userId, updatedUser);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
        verify(service, never()).saveUser(any(UserDetails.class));
    }
}
