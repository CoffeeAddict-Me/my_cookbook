package au.com.agic.kasia.project.backend.repository;

import au.com.agic.kasia.project.backend.models.Recipe;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository <Recipe, Integer> {

    Optional<Recipe> findRecipeByTitle(String title);

    @Query("SELECT r FROM Recipe r WHERE LOWER(r.title) LIKE LOWER(concat('%', :title, '%'))")
    Optional<List<Recipe>> searchRecipesByTitleContaining(@Param("title")String title);

    @Query("SELECT r FROM Recipe r WHERE LOWER(r.difficulty) LIKE LOWER(concat('%', :difficulty, '%')) ")
    Optional<List<Recipe>> searchRecipesByDifficulty(@Param("difficulty")String difficulty);

    @Query("SELECT r FROM Recipe r WHERE LOWER(r.cuisine) LIKE LOWER(concat('%', :cuisine, '%')) ")
    Optional<List<Recipe>> searchRecipesByCuisine(@Param("cuisine")String cuisine);

    @Query("SELECT r FROM Recipe r WHERE LOWER(r.ingredient) LIKE LOWER(concat('%', :ingredient, '%' ))")
    Optional<List<Recipe>> searchRecipesByIngredient(@Param("ingredient")String ingredient);

//    @Query("SELECT fav FROM RECIPE_USERDETAILS fav WHERE (fav.recipe_id) LIKE (:recipeId)")
//    Optional<List<?>> searchFavourites(@Param("recipeId")Integer recipeId);

    Optional<Recipe> searchRecipesByIngredientContains(String ingredient);

}
