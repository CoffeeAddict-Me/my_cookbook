package au.com.agic.kasia.project.backend.services;

import au.com.agic.kasia.project.backend.exception.RecipeNotFoundException;
import au.com.agic.kasia.project.backend.exception.UserNotFoundException;
import au.com.agic.kasia.project.backend.models.Recipe;
import au.com.agic.kasia.project.backend.models.UserDetails;
import au.com.agic.kasia.project.backend.repository.RecipeRepository;
import au.com.agic.kasia.project.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavouritesService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    public void addRecipeToFavourites(Integer id, Integer recipeId) {
        UserDetails userDetails = userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User was not found")
        );
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(
                () -> new RecipeNotFoundException("Recipe was not found")
        );
        userDetails.getRecipes().add(recipe);
        recipe.getUserDetails().add(userDetails);

        userRepository.save(userDetails);
        recipeRepository.save(recipe);
    }

    public List<Recipe> getAllFavouriteRecipesByUserId(Integer id) {
        UserDetails userDetails = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User was not found"));
        return new ArrayList<>(userDetails.getRecipes());
    }

    public List <UserDetails> getAllUsersThatLikedRecipe(Integer recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RecipeNotFoundException("Recipe was not found"));
        return new ArrayList<>(recipe.getUserDetails());
    }

    public void removeRecipeFromFavourites(Integer id, Integer recipeId) {
        UserDetails userDetails = userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User was not found")
        );
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(
                () -> new RecipeNotFoundException("Recipe was not found")
        );
        userDetails.getRecipes().remove(recipe);
        recipe.getUserDetails().remove(userDetails);

        userRepository.save(userDetails);
        recipeRepository.save(recipe);
    }

    public void removeAllRecipesFromFavourites(Integer userId) {
        UserDetails userDetails = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User was not found")
        );
        // Clear all associated recipes for the user
        userDetails.getRecipes().clear();

        // Save the userDetails entity to update the association in the database
        userRepository.save(userDetails);
    }

    public void removeAllUsersFromFavouritesByRecipeId(Integer recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(
                () -> new RecipeNotFoundException("Recipe was not found")
        );
        recipe.getUserDetails().clear();
        recipeRepository.save(recipe);
    }

}
