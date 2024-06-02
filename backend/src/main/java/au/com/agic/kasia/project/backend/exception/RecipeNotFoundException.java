package au.com.agic.kasia.project.backend.exception;

public class RecipeNotFoundException extends RuntimeException {
    public RecipeNotFoundException(String message){
        super(message);
    }
}
