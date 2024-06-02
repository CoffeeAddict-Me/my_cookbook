package au.com.agic.kasia.project.backend.services;

import au.com.agic.kasia.project.backend.exception.RecipeNotFoundException;
import au.com.agic.kasia.project.backend.models.Recipe;
import au.com.agic.kasia.project.backend.repository.RecipeRepository;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class RecipeServiceTest {
    @InjectMocks
    private RecipeService recipeService;

    @Mock
    private RecipeRepository recipeRepository;

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
    @DisplayName("Test addRecipe")
    public void testAddRecipe() {
        // Given
        Recipe recipe = new Recipe();
        recipe.setRecipeId(1);
        recipe.setTitle("Chocolate Cake");
        when(recipeRepository.save(any(Recipe.class))).thenReturn(recipe);

        // When
        Recipe savedRecipe = recipeService.addRecipe(recipe);

        // Then
        assertEquals(recipe, savedRecipe);
        verify(recipeRepository, times(1)).save(recipe);
    }

    @Test
    @DisplayName("Test getAllRecipes")
    public void testGetAllRecipes() {
        // Given
        List<Recipe> expectedRecipes = new ArrayList<>();
        expectedRecipes.add(new Recipe());
        expectedRecipes.add(new Recipe());

        when(recipeRepository.findAll()).thenReturn(expectedRecipes);

        // When
        List<Recipe> actualRecipes = recipeService.getAllRecipes();

        // Then
        assertNotNull(actualRecipes);
        assertEquals(expectedRecipes.size(), actualRecipes.size());
        assertEquals(expectedRecipes, actualRecipes);
        verify(recipeRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Test saveRecipe")
    public void testSaveRecipe() {
        Recipe newRecipe = new Recipe();
        newRecipe.setTitle("Chocolate cake");
        newRecipe.setIngredient("Yummy ingredients");
        newRecipe.setMethod("Mixing, baking");
        newRecipe.setDifficulty("easy");
        newRecipe.setCuisine("Desserts");
        newRecipe.setPhotoUrl("pretty picture");
        when(recipeRepository.save(newRecipe)).thenReturn(newRecipe);

        Recipe savedRecipe = recipeService.saveRecipe(newRecipe);

        assertEquals(newRecipe, savedRecipe);
        verify(recipeRepository).save(newRecipe);
    }

    @Test
    @DisplayName("Test findRecipeById when recipe was found")
    public void testFindRecipeById_Found() {
        // Arrange
        Integer recipeId = 1;
        Recipe expectedRecipe = new Recipe();
        expectedRecipe.setRecipeId(recipeId);
        expectedRecipe.setTitle("Chocolate Cake");
        when(recipeRepository.findById(recipeId)).thenReturn(Optional.of(expectedRecipe));

        Recipe result = recipeService.findRecipeById(recipeId);

        assertEquals(expectedRecipe, result);
    }

    @Test
    @DisplayName("Test findRecipeById when recipe was not found")
    public void testFindRecipeById_NotFound() {
        // Arrange
        Integer recipeId = 99;
        when(recipeRepository.findById(recipeId)).thenReturn(Optional.empty());

        // Act and Assert
        Exception exception = assertThrows(RecipeNotFoundException.class, () -> {
            recipeService.findRecipeById(recipeId);
        }, "Expected RecipeNotFoundException to be thrown");

        assertTrue(exception.getMessage().contains("Recipe by id " + recipeId + " not found"), "Error message does not match");
    }

    @Test
    @DisplayName("Test searchRecipesByTitleContaining when recipe was found")
    public void testSearchRecipesByTitleContaining_Found() {
        // Arrange
        String title = "Chocolate";
        List<Recipe> expectedRecipes = new ArrayList<>();
        Recipe recipe = new Recipe();
        recipe.setTitle("Chocolate Cake");
        expectedRecipes.add(recipe);
        when(recipeRepository.searchRecipesByTitleContaining(title)).thenReturn(Optional.of(expectedRecipes));

        // Act
        List<Recipe> results = recipeService.searchRecipesByTitleContaining(title);

        // Assert
        assertFalse(results.isEmpty(), "The list of recipes should not be empty");
        assertEquals(expectedRecipes, results, "The recipes returned were not as expected");
    }

    @Test
    @DisplayName("Test searchRecipesByTitleContaining when recipe was not found")
    public void testSearchRecipesByTitleContaining_NotFound() {
        // Arrange
        String title = "Nonexistent";
        when(recipeRepository.searchRecipesByTitleContaining(title)).thenReturn(Optional.empty());

        // Act and Assert
        Exception exception = assertThrows(RecipeNotFoundException.class, () -> {
            recipeService.searchRecipesByTitleContaining(title);
        }, "Expected RecipeNotFoundException to be thrown");

        assertTrue(exception.getMessage().contains("Recipe by title " + title + " not found"), "Error message does not match");
    }

    @Test
    @DisplayName("Test searchRecipesByDifficulty when recipe found")
    public void testSearchRecipesByDifficulty_Found() {
        // Arrange
        String difficulty = "easy";
        List<Recipe> expectedRecipes = new ArrayList<>();
        Recipe recipe = new Recipe();
        recipe.setDifficulty("easy");
        expectedRecipes.add(recipe);
        when(recipeRepository.searchRecipesByDifficulty(difficulty)).thenReturn(Optional.of(expectedRecipes));

        // Act
        List<Recipe> results = recipeService.searchRecipesByDifficulty(difficulty);

        // Assert
        assertFalse(results.isEmpty());
        assertEquals(expectedRecipes, results);
    }

    @Test
    @DisplayName("Test searchRecipesByDifficulty when recipe was not found")
    public void testSearchRecipesByDifficulty_NotFound() {
        // Arrange
        String difficulty = "unknown";
        when(recipeRepository.searchRecipesByDifficulty(difficulty)).thenReturn(Optional.empty());

        // Act and Assert
        Exception exception = assertThrows(RecipeNotFoundException.class, () -> {
            recipeService.searchRecipesByDifficulty(difficulty);
        }, "Expected RecipeNotFoundException to be thrown");

        assertTrue(exception.getMessage().contains("Recipe by difficulty " + difficulty + " not found"));
    }
    @Test
    @DisplayName("Test searchRecipesByCuisine when recipe found")
    public void testSearchRecipesByCuisine_Found() {

        String cuisine = "cocktails";
        List<Recipe> expectedRecipes = new ArrayList<>();
        Recipe recipe = new Recipe();
        recipe.setCuisine("cocktails");
        expectedRecipes.add(recipe);
        when(recipeRepository.searchRecipesByCuisine(cuisine)).thenReturn(Optional.of(expectedRecipes));

        List<Recipe> results = recipeService.searchRecipesByCuisine(cuisine);

        assertFalse(results.isEmpty());
        assertEquals(expectedRecipes, results);
    }

    @Test
    @DisplayName("Test searchRecipesByCuisine when recipe was not found")
    public void testSearchRecipesByCuisine_NotFound() {
        // Given
        String cuisine = "unknown";
        when(recipeRepository.searchRecipesByCuisine(cuisine)).thenReturn(Optional.empty());

        // When
        Exception exception = assertThrows(RecipeNotFoundException.class, () -> {
            recipeService.searchRecipesByCuisine(cuisine);
        }, "Expected RecipeNotFoundException to be thrown");

        //Then
        assertTrue(exception.getMessage().contains("Recipe by cuisine " + cuisine + " not found"));
    }

    @Test
    @DisplayName("Test deleteRecipe")
    public void testDeleteRecipe(){
        int recipeId = 42;
        doNothing().when(recipeRepository).deleteById(recipeId);

        recipeService.deleteRecipe(recipeId);

        verify(recipeRepository, times(1)).deleteById(recipeId);
    }
}
