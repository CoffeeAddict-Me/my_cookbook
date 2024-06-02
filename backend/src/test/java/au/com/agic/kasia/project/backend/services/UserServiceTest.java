package au.com.agic.kasia.project.backend.services;

import au.com.agic.kasia.project.backend.exception.UserNotFoundException;
import au.com.agic.kasia.project.backend.models.UserDetails;
import au.com.agic.kasia.project.backend.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserServiceTest {
    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    private AutoCloseable closeable;

    @BeforeEach
    public void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    public void tearDown() throws Exception {
        closeable.close();
    }

    @Test
    @DisplayName("Test addUser")
    public void testAddUser(){
        //Given
        UserDetails newUser = new UserDetails();
        newUser.setName("Test User");
        newUser.setUsername("testUsername");
        newUser.setEmail("test@email.com");
        newUser.setPassword("testPassword");
        when(userRepository.save(any(UserDetails.class))).thenReturn(newUser);
        //When
        UserDetails savedUser = userService.addUser(newUser);
        //Then
        assertEquals(newUser, savedUser);
        verify(userRepository, times(1)).save(newUser);
    }
    @Test
    @DisplayName("Test getAllUsers")
    public void testGetAllUsers() {
        //Given
        List<UserDetails> expectedUsers = new ArrayList<>();
        expectedUsers.add(new UserDetails());
        expectedUsers.add(new UserDetails());
        when(userRepository.findAll()).thenReturn(expectedUsers);
        //When
        List<UserDetails> actualUsers = userService.findAllUsers();
        //Then
        assertNotNull(actualUsers);
        assertEquals(expectedUsers.size(), actualUsers.size());
        assertEquals(expectedUsers, actualUsers);
        verify(userRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Test save user")
    public void testSaveUser() {

        UserDetails newUser = new UserDetails();
        newUser.setUserId(42);
        newUser.setName("Some Name");
        newUser.setUsername("username");
        newUser.setEmail("test@email.com");
        newUser.setPassword("password");
        when(userRepository.save(newUser)).thenReturn(newUser);

        UserDetails savedUser = userService.saveUser(newUser);

        assertEquals(newUser, savedUser);
        verify(userRepository).save(newUser);
    }
    @Test
    @DisplayName("Test findUserById when user was found")
    public void testFindUserById_Found() {
        //Given
        UserDetails newUser = new UserDetails();
        int userId = 42;
        newUser.setUserId(userId);
        newUser.setName("Some Name");
        newUser.setUsername("username");
        newUser.setEmail("test@email.com");
        newUser.setPassword("password");
        when(userRepository.findById(userId)).thenReturn(Optional.of(newUser));

        UserDetails result = userService.findUserById(userId);

        assertEquals(newUser, result);
    }
    @Test
    @DisplayName("Test findUserById when user was not found")
    public void testFindUserById_NotFound() {
        // Arrange
        Integer userId = 99;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Act and Assert
        Exception exception = assertThrows(UserNotFoundException.class, () -> {
            userService.findUserById(userId);
        }, "Expected RecipeNotFoundException to be thrown");

        assertTrue(exception.getMessage().contains("User by id " + userId + " was not found!"));
    }

    @Test
    @DisplayName("Test delete user")
    public void testDeleteUser() {
        int userId = 42;
        doNothing().when(userRepository).deleteById(userId);

        userService.deleteUser(userId);

        verify(userRepository, times(1)).deleteById(userId);
    }

    @Test
    @DisplayName("Test findUserByUsername when user found")
    public void testFindUserByUsername_Found() {
        String username = "username";
        UserDetails expectedUser = new UserDetails();
        expectedUser.setUsername(username);

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(expectedUser));

        UserDetails result = userService.findUserByUsername(username);

        assertEquals(expectedUser, result);
    }

    @Test
    @DisplayName("Test findUserByUsername when user was not found")
    public void testFindUserByUsername_NotFound() {
        // Given
        String username = "unknown";
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        // When
        Exception exception = assertThrows(UserNotFoundException.class, () -> {
            userService.findUserByUsername(username);
        });

        //Then
        assertTrue(exception.getMessage().contains("User by email " + username + " was not found!"));
    }

    @Test
    public void testCheckForExistingUser_UserExists() {
        // Given
        String username = "testUser";
        UserDetails mockUser = new UserDetails();
        mockUser.setUsername(username);
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(mockUser));

        // When
        Optional<UserDetails> result = userService.checkForExistingUser(username);

        // Then
        assertTrue(result.isPresent());
        verify(userRepository).findByUsername(username);
    }

    @Test
    public void testCheckForExistingUser_UserDoesNotExist() {
        // Given
        String username = "nonExistentUser";
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        // When
        Optional<UserDetails> result = userService.checkForExistingUser(username);

        // Then
        assertFalse(result.isPresent());
        verify(userRepository).findByUsername(username);
    }

    @Test
    void shouldValidateLegitUser() {

        UserDetails user = new UserDetails("testing user", "test", "me@me.me", "FeKw08M4keuw8e9gnsQZQgwg4yDOlMZfvIwzEkSOsiU=");
        Optional<UserDetails> optionalUser = Optional.of(user);

        when(userRepository.findByUsername("test")).thenReturn(optionalUser);

        boolean isAuthenticated = userService.authenticateUser("test", "123456789");

        assertTrue(isAuthenticated);
    }

    @Test
    void shouldStopStrangeUser() {

        UserDetails user = new UserDetails("testing user", "test", "me@me.me", "FeKw08M4keuw8e9gnsQZQgwg4yDOlMZfvIwzEkSOsiU=");
        Optional<UserDetails> optionalUser = Optional.of(user);

        when(userRepository.findByUsername("test")).thenReturn(optionalUser);

        boolean isAuthenticated = userService.authenticateUser("test", "ijustmadeupthis");

        assertFalse(isAuthenticated);
    }
}
