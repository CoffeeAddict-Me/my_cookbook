package au.com.agic.kasia.project.backend.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name ="userDetails")
public class UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column (nullable = false, updatable = false)
    private int userId;

    @Column (nullable = false)
    private String name;

    @Column (nullable = false)
    private String username;

    @Column (nullable = false)
    private String email;

    @Column (nullable = false)
    private String password;

    @Column
    private String role = "USER";

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "recipe_userdetails",
            joinColumns = @JoinColumn(name = "userdetails_id"),
            inverseJoinColumns = @JoinColumn(name = "recipe_id")

    )

    private Set<Recipe> recipes = new HashSet<>();

    public Set<Recipe> getRecipes(){
        return recipes;
    }
    // Setter for recipes (if needed, though not typically used for collections)
    public void setRecipes(Set<Recipe> recipes) {
        this.recipes = recipes;
    }

    // Helper method to add a recipe to the set
    public void addRecipe(Recipe recipe) {
        this.recipes.add(recipe);
    }

    public UserDetails() {}

    public UserDetails(
            String name,
            String username,
            String email,
            String password,
            String role

    ){
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int id) {
        this.userId = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
