package au.com.agic.javaexercises.wc.files;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Stream;

public interface FileStreamer {

    void applyProcessors(final List<? extends Consumer<String>> aggregators);

}
