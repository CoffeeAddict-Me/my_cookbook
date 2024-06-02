package au.com.agic.kasia.project.backend.controller;

import au.com.agic.kasia.project.backend.exception.RecipeNotFoundException;
import au.com.agic.kasia.project.backend.exception.UserNotFoundException;
import au.com.agic.kasia.project.backend.models.Recipe;
import au.com.agic.kasia.project.backend.models.UserDetails;
import au.com.agic.kasia.project.backend.services.FavouritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/favourites")
public class FavouritesController {

    @Autowired
    private FavouritesService favouritesService;

    @PostMapping("/add")
    public ResponseEntity<?> addRecipeToFavourites(@RequestParam Integer id, @RequestParam Integer recipeId) {
        try {
            favouritesService.addRecipeToFavourites(id, recipeId);
            return ResponseEntity.ok(Map.of("message", "Recipe was added successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "An unexpected error occurred"));
        }
    }
//    @PostMapping("/add")
//    public ResponseEntity<?> addRecipeToFavourites(
//            @RequestParam Integer userId,
//            @RequestParam Integer recipeId
//    ) {
//        favouritesService.addRecipeToFavourites(userId, recipeId);
//        return ResponseEntity.ok().body("Recipe was added to successfully");
//    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllFavouriteRecipesByUserId(@RequestParam Integer userId) {
        try {
            List<Recipe> favouriteRecipes = favouritesService.getAllFavouriteRecipesByUserId(userId);
            return new ResponseEntity<>(favouriteRecipes, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Generic error handling for any other exceptions
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/remove")
    public ResponseEntity<?> removeRecipeFromFavourites(@RequestParam Integer userId, @RequestParam Integer recipeId) {
        try {
            favouritesService.removeRecipeFromFavourites(userId, recipeId);
            return ResponseEntity.ok().body("Recipe was removed successfully");
        } catch (RecipeNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.EXPECTATION_FAILED);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred deleting recipe", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<?> removeAllRecipesFromFavourites(@PathVariable("userId") Integer userId) {
        try {
            favouritesService.removeAllRecipesFromFavourites(userId);
            return ResponseEntity.ok().body("All recipes were removed from favourites");
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred while clearing all favourite recipes.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}

