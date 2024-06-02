package au.com.agic.kasia.project.backend.controller;


import au.com.agic.kasia.project.backend.exception.UserNotFoundException;
import au.com.agic.kasia.project.backend.models.UserDetails;
import au.com.agic.kasia.project.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDetails>> getAllUsers() {
        try {
            List<UserDetails> allUserDetails = userService.findAllUsers();
            return new ResponseEntity<>(allUserDetails, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/find/{userId}")
    public ResponseEntity<UserDetails> getUserById(@PathVariable("userId") Integer userId) {
        try {
            UserDetails userDetails = userService.findUserById(userId);
            return new ResponseEntity<>(userDetails, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserDetails> getUserByUsername(@PathVariable("username") String username) {
        try {
            UserDetails userDetails = userService.findUserByUsername(username);
            return new ResponseEntity<>(userDetails, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("add")
    public ResponseEntity<?> addUser(@RequestBody UserDetails userDetails) {
        try {
            UserDetails newUserDetails = userService.addUser(userDetails);
            return new ResponseEntity<>(newUserDetails, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<UserDetails> updateUser(@PathVariable("userId") Integer userId, @RequestBody UserDetails userDetails) {

        try {
            UserDetails existingUserDetails = userService.findUserById(userId);
            if (existingUserDetails == null) {
                // Return a 404 Not Found if the user doesn't exist
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            // Update the existing user details with the new values
            existingUserDetails.setName(userDetails.getName());
            existingUserDetails.setUsername(userDetails.getUsername());
            existingUserDetails.setEmail(userDetails.getEmail());
            existingUserDetails.setPassword(userDetails.getPassword());
            existingUserDetails.setRole(userDetails.getRole());

            // Save the updated user details back to the database
            UserDetails updatedUserDetails = userService.saveUser(existingUserDetails);

            // Return the updated user details with a 200 OK
            return new ResponseEntity<>(updatedUserDetails, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") Integer userId) {
        try {
            userService.deleteUser(userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/check/{username}")
    public ResponseEntity<?> checkForExistingUser(@PathVariable String username) {
        try {
            Optional<UserDetails> userDetails = userService.checkForExistingUser(username);
            if (userDetails.isPresent()) {
                return ResponseEntity.ok().body("Username already taken");
            } else {
                return ResponseEntity.ok().body("Username is available");
            }
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateUser(
            @RequestParam String username,
            @RequestParam String password
    ) {
        try {
            boolean isAuthorized = userService.authenticateUser(username, password);
            if (isAuthorized) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while authorizing user");
        }
    }
}
