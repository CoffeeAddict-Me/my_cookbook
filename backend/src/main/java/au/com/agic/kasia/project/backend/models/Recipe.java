package au.com.agic.kasia.project.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name = "recipe")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    int recipeId;
    String title;

    @Column(columnDefinition = "TEXT")
    String ingredient;

    @Column(columnDefinition = "TEXT")
    String method;

    @Column
    String cuisine;

    @Column
    String difficulty;

    @Column
    String photoUrl;

    @ManyToMany(mappedBy = "recipes")

    private Set<UserDetails> userDetails = new HashSet<>();

    // Getter for userDetails
    public Set<UserDetails> getUserDetails() {
        return userDetails;
    }

    // Setter for userDetails (if needed, though not typically used for collections)
    public void setUserDetails(Set<UserDetails> userDetails) {
        this.userDetails = userDetails;
    }

    // Helper method to add a user detail to the set
    public void addUserDetail(UserDetails userDetails) {
        this.userDetails.add(userDetails);
    }

    public Recipe(){}

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIngredient() {
        return ingredient;
    }

    public void setIngredient(String ingredient) {
        this.ingredient = ingredient;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }
}
