package au.com.agic.kasia.project.backend.services;


import au.com.agic.kasia.project.backend.exception.RecipeNotFoundException;
import au.com.agic.kasia.project.backend.models.Recipe;
import au.com.agic.kasia.project.backend.repository.RecipeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class RecipeService {

    private final RecipeRepository recipeRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository){
        this.recipeRepository = recipeRepository;
    }

    public Recipe addRecipe(Recipe recipe){
        return recipeRepository.save(recipe);
    }

    public List<Recipe>getAllRecipes(){
        return recipeRepository.findAll();
    }

    public Recipe saveRecipe(Recipe recipe){
        return recipeRepository.save(recipe);
    }

    public Recipe findRecipeById(Integer recipeId){
        return recipeRepository.findById(recipeId).orElseThrow(
                () -> new RecipeNotFoundException("Recipe by id " + recipeId + " not found")
        );
    }

    public List<Recipe> searchRecipesByTitleContaining(String title){
        return recipeRepository.searchRecipesByTitleContaining(title).orElseThrow(
                () -> new RecipeNotFoundException("Recipe by title " + title + " not found")
        );
    }
    public List<Recipe> searchRecipesByDifficulty(String difficulty){
        return recipeRepository.searchRecipesByDifficulty(difficulty).orElseThrow(
                () -> new RecipeNotFoundException("Recipe by difficulty " + difficulty + " not found")
        );
    }

    public List<Recipe> searchRecipesByCuisine(String cuisine){
        return recipeRepository.searchRecipesByCuisine(cuisine).orElseThrow(
                () -> new RecipeNotFoundException("Recipe by cuisine " + cuisine + " not found")
        );
    }

    public List<Recipe> searchRecipeByIngredient(String ingredient) {
        return recipeRepository.searchRecipesByIngredient(ingredient).orElseThrow(
                () -> new RecipeNotFoundException("Recipe by ingredient " + ingredient + " not found")
        );
    }

    public void deleteRecipe(Integer id){
        recipeRepository.deleteById(id);
    }

}
