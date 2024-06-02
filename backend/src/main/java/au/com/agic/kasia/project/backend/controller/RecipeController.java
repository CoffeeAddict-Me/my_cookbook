package au.com.agic.kasia.project.backend.controller;

import au.com.agic.kasia.project.backend.exception.RecipeNotFoundException;
import au.com.agic.kasia.project.backend.models.Recipe;
import au.com.agic.kasia.project.backend.services.FavouritesService;
import au.com.agic.kasia.project.backend.services.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    private final RecipeService recipeService;
    private final FavouritesService favouritesService;

    public RecipeController(RecipeService recipeService, FavouritesService favouritesService) {
        this.recipeService = recipeService;
        this.favouritesService = favouritesService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        try {
            List<Recipe> allRecipes = recipeService.getAllRecipes();
            return new ResponseEntity<>(allRecipes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/find/{recipeId}")
    public ResponseEntity<Recipe> findRecipeById(@PathVariable("recipeId") Integer recipeId) {
        try {
            Recipe recipe = recipeService.findRecipeById(recipeId);
            return new ResponseEntity<>(recipe, HttpStatus.FOUND);
        } catch (RecipeNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findtitle/{title}")
    public ResponseEntity<?> searchRecipesByTitleContaining(@PathVariable("title") String title) {
        try {
            List<Recipe> foundRecipes = recipeService.searchRecipesByTitleContaining(title);
            if (foundRecipes.isEmpty()) {
                return new ResponseEntity<>("No recipes found for title: " + title, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(foundRecipes, HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception details for further investigation
            return new ResponseEntity<>("An error occurred while processing your request.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findingredient/{ingredient}")
    public ResponseEntity<?> searchRecipesByIngredientContaining(
            @PathVariable("ingredient") String ingredient
    ) {
        try {
            List<Recipe> foundRecipes = recipeService.searchRecipeByIngredient(ingredient);
            if (foundRecipes.isEmpty()) {
                return new ResponseEntity<>("No recipes found for ingredient " + ingredient, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(foundRecipes, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while processing your request.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/filterdiff/{difficulty}")
    public ResponseEntity<?> searchRecipesByDifficulty(@PathVariable("difficulty") String difficulty) {
        try {
            List<Recipe> foundRecipes = recipeService.searchRecipesByDifficulty(difficulty);
            if (foundRecipes.isEmpty()) {
                return new ResponseEntity<>("No recipes found for difficulty: " + difficulty, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(foundRecipes, HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception details for further investigation
            return new ResponseEntity<>("An error occurred while processing your request.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
//querry params instead of path for multiple filters
    @GetMapping("/filtercuis/{cuisine}")
    public ResponseEntity<?> searchRecipesByCuisine(@PathVariable("cuisine") String cuisine) {
        try {
            List<Recipe> foundRecipes = recipeService.searchRecipesByCuisine(cuisine);
            if (foundRecipes.isEmpty()) {
                return new ResponseEntity<>("No recipes found for cuisine: " + cuisine, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(foundRecipes, HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception details for further investigation
            return new ResponseEntity<>("An error occurred while processing your request.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("add")
    public ResponseEntity<Recipe> addRecipe(@RequestBody Recipe recipe) {
        try {
            Recipe newRecipe = recipeService.addRecipe(recipe);
            return new ResponseEntity<>(newRecipe, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{recipeId}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable("recipeId") Integer recipeId, @RequestBody Recipe recipe) {
        try {
            Recipe existingRecipe = recipeService.findRecipeById(recipeId);
            if (existingRecipe == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            existingRecipe.setTitle(recipe.getTitle());
            existingRecipe.setIngredient(recipe.getIngredient());
            existingRecipe.setMethod(recipe.getMethod());
            existingRecipe.setDifficulty(recipe.getDifficulty());
            existingRecipe.setPhotoUrl(recipe.getPhotoUrl());
            existingRecipe.setCuisine(recipe.getCuisine());
            Recipe updatedRecipe = recipeService.saveRecipe(existingRecipe);
            return new ResponseEntity<>(updatedRecipe, HttpStatus.OK);
        } catch (RecipeNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.I_AM_A_TEAPOT);
        }

    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<?> deleteRecipe(@PathVariable("recipeId") Integer recipeId) {
        if(favouritesService.getAllUsersThatLikedRecipe(recipeId).isEmpty()) {
            try {
            //add favourites service clear users so can be deleted
            favouritesService.removeAllUsersFromFavouritesByRecipeId(recipeId);
            recipeService.deleteRecipe(recipeId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RecipeNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }} else {
            return new ResponseEntity<>(HttpStatus.LOCKED);
        }

    }

}
