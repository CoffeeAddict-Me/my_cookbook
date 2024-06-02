package au.com.agic.kasia.project.backend.services;

import au.com.agic.kasia.project.backend.exception.UserNotFoundException;
import au.com.agic.kasia.project.backend.models.UserDetails;
import au.com.agic.kasia.project.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    //add new user
    public UserDetails addUser(UserDetails userDetails){
        String clearPassword = userDetails.getPassword();
        String hashedPassword = hashString(clearPassword);
        userDetails.setPassword(hashedPassword);
        return userRepository.save(userDetails);
    }

    public List<UserDetails> findAllUsers(){
        return userRepository.findAll();
    }

    public UserDetails saveUser(UserDetails userDetails) {
        return userRepository.save(userDetails);
    }

    public UserDetails findUserById(Integer id){
        return userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User by id " + id + " was not found!")
        );
    }
    public void deleteUser(Integer id){
        userRepository.deleteById(id);
    }


    public UserDetails findUserByUsername(String username){
        return userRepository.findByUsername(username).orElseThrow(
                () -> new UserNotFoundException("User by email " + username + " was not found!")
        );
    }

    public Optional <UserDetails> checkForExistingUser(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean authenticateUser (String username, String password) {
        Optional<UserDetails> usernameInDatabase = userRepository.findByUsername(username);

        if (usernameInDatabase.isPresent()) {
            return usernameInDatabase.get().getPassword().equals(hashString(password));
        } else {
            return false;
        }
    }

    private String hashString(String originalPassword){
        try{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(originalPassword.getBytes(StandardCharsets.UTF_8));
            return byteToString(hash);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    private String byteToString(byte[] bytes) {
        return new String(Base64.getEncoder().encode(bytes));
    }

}