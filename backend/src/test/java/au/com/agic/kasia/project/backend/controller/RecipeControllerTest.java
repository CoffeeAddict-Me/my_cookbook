package au.com.agic.kasia.project.backend.controller;

import au.com.agic.kasia.project.backend.models.Recipe;
import au.com.agic.kasia.project.backend.models.UserDetails;
import au.com.agic.kasia.project.backend.services.RecipeService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class RecipeControllerTest {
    @InjectMocks
    private RecipeController underTestRecipeController;

    @Mock
    private RecipeService service;

    private AutoCloseable closeable;

    @BeforeEach
    public void setupMocks() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    public void releaseMocks() throws Exception {
        closeable.close();
    }

    @Test
    public void testGetAllRecipes() throws Exception {
        List<Recipe> expectedRecipes = new ArrayList<>();
        when(service.getAllRecipes()).thenReturn(expectedRecipes);

        ResponseEntity<List<Recipe>> response = underTestRecipeController.getAllRecipes();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedRecipes, response.getBody());
        verify(service).getAllRecipes();
    }

    @Test
    public void testFindRecipeById() throws Exception {
        int recipeId = 1;
        Recipe expectedRecipe = new Recipe();
        when(service.findRecipeById(recipeId)).thenReturn(expectedRecipe);

        ResponseEntity<Recipe> response = underTestRecipeController.findRecipeById(recipeId);

        assertEquals(HttpStatus.FOUND, response.getStatusCode());
        assertEquals(expectedRecipe, response.getBody());
        verify(service).findRecipeById(recipeId);
    }

    @Test
    public void testSearchRecipesByTitleContaining_Found() throws Exception {
        String title = "Chocolate";
        List<Recipe> foundRecipes = new ArrayList<>();
        foundRecipes.add(new Recipe());  // Add mock data as needed
        when(service.searchRecipesByTitleContaining(title)).thenReturn(foundRecipes);

        ResponseEntity<?> response = underTestRecipeController.searchRecipesByTitleContaining(title);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(foundRecipes, response.getBody());
        verify(service).searchRecipesByTitleContaining(title);
    }

    @Test
    public void testSearchRecipesByTitleContaining_NotFound() throws Exception {
        String title = "Unknown";
        List<Recipe> foundRecipes = new ArrayList<>();
        when(service.searchRecipesByTitleContaining(title)).thenReturn(foundRecipes);

        ResponseEntity<?> response = underTestRecipeController.searchRecipesByTitleContaining(title);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertTrue(response.getBody().toString().contains("No recipes found for title: " + title));
        verify(service).searchRecipesByTitleContaining(title);
    }

    @Test
    public void testSearchRecipesByTitleContaining_Exception() throws Exception {
        String title = "ErrorTest";
        when(service.searchRecipesByTitleContaining(title)).thenThrow(new RuntimeException("Database error"));

        ResponseEntity<?> response = underTestRecipeController.searchRecipesByTitleContaining(title);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An error occurred while processing your request.", response.getBody());
        verify(service).searchRecipesByTitleContaining(title);
    }

    @Test
    public void testSearchRecipesByDifficulty_Found() throws Exception {
        String difficulty = "easy";
        List<Recipe> foundRecipes = new ArrayList<>();
        foundRecipes.add(new Recipe());
        when(service.searchRecipesByDifficulty(difficulty)).thenReturn(foundRecipes);

        ResponseEntity<?> response = underTestRecipeController.searchRecipesByDifficulty(difficulty);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(foundRecipes, response.getBody());
        verify(service).searchRecipesByDifficulty(difficulty);
    }

    @Test
    public void testSearchRecipesByDifficulty_NotFound() throws Exception {
        String difficulty = "unknown";
        List<Recipe> foundRecipes = new ArrayList<>();
        when(service.searchRecipesByDifficulty(difficulty)).thenReturn(foundRecipes);

        ResponseEntity<?> response = underTestRecipeController.searchRecipesByDifficulty(difficulty);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertTrue(response.getBody().toString().contains("No recipes found for difficulty: " + difficulty));
        verify(service).searchRecipesByDifficulty(difficulty);
    }

    @Test
    public void testSearchRecipesByDifficulty_Exception() throws Exception {
        String difficulty = "Error Test";
        when(service.searchRecipesByDifficulty(difficulty)).thenThrow(new RuntimeException("Database error"));

        ResponseEntity<?> response = underTestRecipeController.searchRecipesByDifficulty(difficulty);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An error occurred while processing your request.", response.getBody());
        verify(service).searchRecipesByDifficulty(difficulty);
    }

    @Test
    public void testSearchRecipesByCuisine_Found() throws Exception {
        String cuisine = "Cocktail";
        List<Recipe> foundRecipes = new ArrayList<>();
        foundRecipes.add(new Recipe());
        when(service.searchRecipesByCuisine(cuisine)).thenReturn(foundRecipes);

        ResponseEntity<?> response = underTestRecipeController.searchRecipesByCuisine(cuisine);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(foundRecipes, response.getBody());
        verify(service).searchRecipesByCuisine(cuisine);
    }

    @Test
    public void testSearchRecipesByCuisine_NotFound() throws Exception {
        String cuisine = "unknown";
        List<Recipe> foundRecipes = new ArrayList<>();
        when(service.searchRecipesByCuisine(cuisine)).thenReturn(foundRecipes);

        ResponseEntity<?> response = underTestRecipeController.searchRecipesByCuisine(cuisine);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertTrue(response.getBody().toString().contains("No recipes found for cuisine: " + cuisine));
        verify(service).searchRecipesByCuisine(cuisine);
    }

    @Test
    public void testSearchRecipesByCuisine_Exception() throws Exception {
        String cuisine = "Error Test";
        when(service.searchRecipesByCuisine(cuisine)).thenThrow(new RuntimeException("Database error"));

        ResponseEntity<?> response = underTestRecipeController.searchRecipesByCuisine(cuisine);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An error occurred while processing your request.", response.getBody());
        verify(service).searchRecipesByCuisine(cuisine);
    }

    @Test
    public void testAddRecipe() {
        Recipe newRecipe = new Recipe();
        newRecipe.setTitle("Test title");
        newRecipe.setIngredient("Test Ingredients");
        newRecipe.setMethod("Test Method");
        newRecipe.setCuisine("Cocktail");
        newRecipe.setDifficulty("easy");
        newRecipe.setPhotoUrl("url");

        when(service.addRecipe(any(Recipe.class))).thenReturn(newRecipe);

        ResponseEntity<Recipe> response = underTestRecipeController.addRecipe(newRecipe);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertTrue(response.getBody() instanceof Recipe);
        Recipe returnedRecipe = response.getBody();
        assertEquals(newRecipe, returnedRecipe);
        verify(service).addRecipe(newRecipe);
        }

    @Test
    public void testDeleteRecipe() {
        int recipeId = 1;

        doNothing().when(service).deleteRecipe(recipeId);

        ResponseEntity<?> response = underTestRecipeController.deleteRecipe(recipeId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(service).deleteRecipe(recipeId);
    }

    @Test
    public void testUpdateRecipe_RecipeExists() {
        // Given
        Integer recipeId = 1;
        Recipe originalRecipe = new Recipe();
        originalRecipe.setTitle("Old Title");
        originalRecipe.setIngredient("Old Ingredients");
        originalRecipe.setMethod("Old Method");
        originalRecipe.setCuisine("Old Cuisine");
        originalRecipe.setDifficulty("easy");
        originalRecipe.setPhotoUrl("url");

        Recipe updatedRecipe = new Recipe();
        originalRecipe.setTitle("New Title");
        originalRecipe.setMethod("New Method");
        originalRecipe.setDifficulty("difficult");

        when(service.findRecipeById(recipeId)).thenReturn(originalRecipe);
        when(service.saveRecipe(any(Recipe.class))).thenReturn(updatedRecipe);

        // When
        ResponseEntity<Recipe> response = underTestRecipeController.updateRecipe(recipeId, updatedRecipe);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedRecipe, response.getBody());
        verify(service).saveRecipe(any(Recipe.class));
    }

    @Test
    public void testUpdateRecipe_RecipeNotFound() {
        // Given
        Integer recipeId = 1;
        Recipe updatedRecipe = new Recipe();
        when(service.findRecipeById(recipeId)).thenReturn(null);

        // When
        ResponseEntity<Recipe> response = underTestRecipeController.updateRecipe(recipeId, updatedRecipe);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
        verify(service, never()).saveRecipe(any(Recipe.class));
    }
}
