package au.com.agic.kasia.project.backend.controller;

import au.com.agic.kasia.project.backend.exception.UserNotFoundException;
import au.com.agic.kasia.project.backend.models.Recipe;
import au.com.agic.kasia.project.backend.services.FavouritesService;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

public class FavouritesControllerTest {

    @InjectMocks
    private FavouritesController underTestFavouritesController;

    @Mock
    private FavouritesService service;

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
    public void testAddRecipeToFavourites() {
        // Given
        Integer userId = 1;
        Integer recipeId = 100;
        doNothing().when(service).addRecipeToFavourites(userId, recipeId);

        // When
        ResponseEntity<?> response = underTestFavouritesController.addRecipeToFavourites(userId, recipeId);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Recipe was added to successfully", response.getBody());
        verify(service).addRecipeToFavourites(userId, recipeId);
    }
    @Test
    public void testGetAllFavouriteRecipesByUserId_Success() {
        // Given
        Integer userId = 1;
        List<Recipe> expectedRecipes = new ArrayList<>();
        when(service.getAllFavouriteRecipesByUserId(userId)).thenReturn(expectedRecipes);

        // When
        ResponseEntity<?> response = underTestFavouritesController.getAllFavouriteRecipesByUserId(userId);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedRecipes, response.getBody());
    }

    @Test
    public void testGetAllFavouriteRecipesByUserId_UserNotFound() {
        // Given
        Integer userId = 1;
        when(service.getAllFavouriteRecipesByUserId(userId)).thenThrow(new UserNotFoundException("User not found"));

        // When
        ResponseEntity<?> response = underTestFavouritesController.getAllFavouriteRecipesByUserId(userId);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertTrue(response.getBody().toString().contains("User not found"));
    }

    @Test
    public void testGetAllFavouriteRecipesByUserId_GeneralException() {
        // Given
        Integer userId = 1;
        when(service.getAllFavouriteRecipesByUserId(userId)).thenThrow(new RuntimeException("Unexpected error"));

        // When
        ResponseEntity<?> response = underTestFavouritesController.getAllFavouriteRecipesByUserId(userId);

        // Then
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertTrue(response.getBody().toString().contains("An unexpected error occurred."));
    }

    @Test
    public void testRemoveRecipeFromFavourites() {
        Integer id = 1;
        Integer recipeId = 100;
        doNothing().when(service).removeRecipeFromFavourites(id, recipeId);

        ResponseEntity<?> response = underTestFavouritesController.removeRecipeFromFavourites(id, recipeId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(service).removeRecipeFromFavourites(id, recipeId);
    }

    @Test
    public void testRemoveAllRecipesFromFavourites () {
        Integer id = 1;
        doNothing().when(service).removeAllRecipesFromFavourites(id);

        ResponseEntity<?> response = underTestFavouritesController.removeAllRecipesFromFavourites(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(service).removeAllRecipesFromFavourites(id);
    }

}
