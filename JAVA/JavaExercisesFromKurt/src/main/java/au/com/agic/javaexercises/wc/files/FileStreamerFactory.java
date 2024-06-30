package au.com.agic.javaexercises.wc.files;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Stream;

public class FileStreamerFactory {

    public static FileStreamer getInstance(final Path path) {
        return new FileProcessorImpl(path);
    }

    private static class FileProcessorImpl implements FileStreamer {

        private final Path path;

        private FileProcessorImpl(final Path path) {
            this.path = path;
        }


        public void applyProcessors(final List<? extends Consumer<String>> processors) {
            try (final Stream<String> lines = Files.lines(path)) {
                lines.forEach(line -> processors.forEach(processor -> processor.accept(line)));
            } catch (final IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

}
