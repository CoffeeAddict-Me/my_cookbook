package au.com.agic.kasia.project.backend.services;

import au.com.agic.kasia.project.backend.exception.RecipeNotFoundException;
import au.com.agic.kasia.project.backend.exception.UserNotFoundException;
import au.com.agic.kasia.project.backend.models.Recipe;
import au.com.agic.kasia.project.backend.models.UserDetails;
import au.com.agic.kasia.project.backend.repository.RecipeRepository;
import au.com.agic.kasia.project.backend.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FavouritesServiceTest {
    @InjectMocks
    private FavouritesService favouritesService;

    @Mock
    private RecipeRepository recipeRepository;

    @Mock
    private UserRepository userRepository;

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
    public void testAddRecipeToFavourites() {
        // Given
        Integer userId = 1, recipeId = 1;
        UserDetails user = new UserDetails();
        user.setUserId(userId);
        user.setRecipes(new HashSet<>());

        Recipe recipe = new Recipe();
        recipe.setRecipeId(recipeId);
        recipe.setUserDetails(new HashSet<>());

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(recipeRepository.findById(recipeId)).thenReturn(Optional.of(recipe));

        // When
        favouritesService.addRecipeToFavourites(userId, recipeId);

        // Then
        assertTrue(user.getRecipes().contains(recipe));
        assertTrue(recipe.getUserDetails().contains(user));
        verify(userRepository).save(user);
        verify(recipeRepository).save(recipe);
    }

    @Test
    public void testAddRecipeToFavourites_UserNotFound() {
        // Given
        Integer userId = 1;
        Integer recipeId = 100;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // When/Then
        assertThrows(UserNotFoundException.class, () -> {
            favouritesService.addRecipeToFavourites(userId, recipeId);
        }, "User was not found");

        verify(userRepository).findById(userId); // Verify the method was called
        verify(recipeRepository, never()).findById(any()); // Verify that the recipe repository is not called since user is not found
    }
    @Test
    public void testAddRecipeToFavourites_RecipeNotFound() {
        // Given
        Integer userId = 1;
        Integer recipeId = 100;
        UserDetails user = new UserDetails(); // Assuming a constructor or setters to initialize
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(recipeRepository.findById(recipeId)).thenReturn(Optional.empty());

        // When/Then
        assertThrows(RecipeNotFoundException.class, () -> {
            favouritesService.addRecipeToFavourites(userId, recipeId);
        }, "Recipe was not found");

        verify(userRepository).findById(userId); // Verify the user was fetched
        verify(recipeRepository).findById(recipeId); // Verify the recipe fetch attempt
    }


    @Test
    public void testGetAllFavouriteRecipesByUserId() {
        // Given
        Integer userId = 1;
        UserDetails user = new UserDetails();
        user.setUserId(userId);
        Recipe recipe1 = new Recipe();
        recipe1.setRecipeId(101);
        Recipe recipe2 = new Recipe();
        recipe2.setRecipeId(102);
        HashSet<Recipe> recipes = new HashSet<>();
        recipes.add(recipe1);
        recipes.add(recipe2);
        user.setRecipes(recipes);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // When
        List<Recipe> retrievedRecipes = favouritesService.getAllFavouriteRecipesByUserId(userId);

        // Then
        assertEquals(2, retrievedRecipes.size());
        assertTrue(retrievedRecipes.containsAll(recipes));
        verify(userRepository).findById(userId);
    }

    @Test
    public void testGetAllFavouriteRecipesByUserId_UserNotFound() {
        // Given
        Integer userId = 99;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Then
        assertThrows(UserNotFoundException.class, () -> {
            // When
            favouritesService.getAllFavouriteRecipesByUserId(userId);
        });
    }

    @Test
    public void testRemoveRecipeFromFavourites() {
        // Given
        Integer userId = 1;
        Integer recipeId = 101;
        UserDetails user = new UserDetails();
        user.setUserId(userId);
        Recipe recipe = new Recipe();
        recipe.setRecipeId(recipeId);
        HashSet<Recipe> recipes = new HashSet<>();
        recipes.add(recipe);
        user.setRecipes(recipes);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(recipeRepository.findById(recipeId)).thenReturn(Optional.of(recipe));

        // When
        favouritesService.removeRecipeFromFavourites(userId, recipeId);

        // Then
        assertFalse(user.getRecipes().contains(recipe));
        verify(userRepository).save(user);
        verify(recipeRepository).save(recipe);
    }

    @Test
    public void testRemoveRecipeFromFavourites_UserNotFound() {
        // Given
        Integer userId = 99;
        Integer recipeId = 101;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Then
        assertThrows(UserNotFoundException.class, () -> {
            // When
            favouritesService.removeRecipeFromFavourites(userId, recipeId);
        });
    }

    @Test
    public void testRemoveRecipeFromFavourites_RecipeNotFound() {
        // Given
        Integer userId = 1;
        Integer recipeId = 101;
        UserDetails user = new UserDetails();
        user.setUserId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(recipeRepository.findById(recipeId)).thenReturn(Optional.empty());

        // Then
        assertThrows(RecipeNotFoundException.class, () -> {
            // When
            favouritesService.removeRecipeFromFavourites(userId, recipeId);
        });
    }

    @Test
    public void testRemoveAllRecipesFromFavourites() {
        // Given
        Integer userId = 1;
        UserDetails user = new UserDetails();
        user.setUserId(userId);
        user.setRecipes(new HashSet<>()); // Assuming the setter is used to manage recipes
        user.getRecipes().add(new Recipe()); // Add a sample recipe to simulate existing favourites

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // When
        favouritesService.removeAllRecipesFromFavourites(userId);

        // Then
        assertTrue(user.getRecipes().isEmpty(), "The recipes list should be empty.");
        verify(userRepository).save(user); // Verify user details are saved after clearing recipes
    }

    @Test
    public void testRemoveAllRecipesFromFavourites_UserNotFound() {
        // Given
        Integer userId = 99; // Non-existing user ID
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Then
        assertThrows(UserNotFoundException.class, () -> {
            // When
            favouritesService.removeAllRecipesFromFavourites(userId);
        });
    }
}
