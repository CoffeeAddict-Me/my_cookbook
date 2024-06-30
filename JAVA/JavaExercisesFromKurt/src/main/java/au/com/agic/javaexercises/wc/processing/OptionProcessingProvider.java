package au.com.agic.javaexercises.wc.processing;

import java.util.List;

import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;

public final class OptionProcessingProvider {

    private static final List<OptionProcessor> optionProcessors =
            List.of(
                    new LineOptionProcessor(),
                    new WordOptionProcessor(),
                    new CharacterOptionProcessor(),
                    new CapitalLetterProcessor()
                    );

    public static Options getAvailableOptions() {
        final Options options = new Options();
        optionProcessors
                .stream()
                .map(OptionProcessor::getOption)
                .forEach(options::addOption);
        return options;
    }

    public static OptionProcessor getProcessorFor(final Option option) {
        return optionProcessors
                .stream()
                .filter(optionProcessor -> optionProcessor.getOption().equals(option))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }

}
