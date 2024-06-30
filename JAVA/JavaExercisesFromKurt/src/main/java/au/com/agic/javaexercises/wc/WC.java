package au.com.agic.javaexercises.wc;

import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import au.com.agic.javaexercises.wc.files.FileStreamer;
import au.com.agic.javaexercises.wc.files.FileStreamerFactory;
import au.com.agic.javaexercises.wc.processing.OptionProcessingProvider;
import au.com.agic.javaexercises.wc.processing.OptionProcessor;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;

public class WC {

    public static void main(final String... args) {

        new WC().execute(args);

    }

   private void execute(final String... args){

        final CommandLineParser parser = new DefaultParser();
        final Options availableOptions = OptionProcessingProvider.getAvailableOptions();

        final CommandLine commandLine;
        try {
            commandLine = parser.parse(availableOptions, args);
        } catch (final ParseException e) {
            throw new RuntimeException(e);
        }

        final List<Option> optionsToProcess = getOptionsToProcess(commandLine, availableOptions);
        final List<OptionProcessor> prototypeOptionProcessors = getOptionProcessors(optionsToProcess);
        final List<String> argList = List.copyOf(commandLine.getArgList());
        processArgList(argList, prototypeOptionProcessors);
    }

    private void processArgList(final List<String> argList,
                                final List<OptionProcessor> prototypeOptionProcessors) {

        final StringBuilder sb = new StringBuilder();

        if (argList.size() == 1) {
            final String arg = argList.get(0);
            final Optional<List<OptionProcessor>> optionProcessors =
                    processArg(arg, prototypeOptionProcessors);

            if (optionProcessors.isPresent()) {
                writeResultsForFile(arg, optionProcessors.get(), sb);
            } else {
                writeNoSuchFileMsg(arg, sb);
            }

        } else {
            final long[] totals = new long[prototypeOptionProcessors.size()];

            for (final String arg : argList) {
                final Optional<List<OptionProcessor>> optionProcessors =
                        processArg(arg, prototypeOptionProcessors);

                if (optionProcessors.isPresent()) {
                    updateTotals(optionProcessors.get(), totals);
                    writeResultsForFile(arg, optionProcessors.get(), sb);
                } else {
                    writeNoSuchFileMsg(arg, sb);
                }

            }

            writeTotals(totals, sb);
        }
        printOutput(sb);
    }

    private static List<Option> getOptionsToProcess(final CommandLine commandLine,
                                                    final Options availableOptions) {
        final List<Option> argumentOptions;

        if (commandLine.getOptions().length == 0) {
            argumentOptions = List.copyOf(availableOptions.getOptions());
        } else {
            argumentOptions = Arrays.asList(commandLine.getOptions());
        }

        return argumentOptions;
    }

    private static List<OptionProcessor> getOptionProcessors(final List<Option> argumentOptions) {
        return argumentOptions.stream()
                               .map(OptionProcessingProvider::getProcessorFor)
                               .toList();
    }

    private Optional<List<OptionProcessor>> processArg(final String arg,
                                                       final List<OptionProcessor> prototypeOptionProcessors) {
        final Path path = getAsAbsolutePath(arg);

        if (isExistingFile(path)) {
            return Optional.of(processPath(path, prototypeOptionProcessors));
        } else {
            return Optional.empty();
        }
    }

    private static Path getAsAbsolutePath(final String arg) {
        return FileSystems.getDefault().getPath(arg).normalize().toAbsolutePath();
    }

    private List<OptionProcessor> processPath(final Path path,
                                                        final List<OptionProcessor> prototypeOptionProcessors) {

        final FileStreamer fileStreamer = FileStreamerFactory.getInstance(path);

        final List<OptionProcessor> optionProcessorsForFile =
                createOptionProcessorsForFile(prototypeOptionProcessors);

        doProcessing(fileStreamer, optionProcessorsForFile);
        return optionProcessorsForFile;

    }

    private static boolean isExistingFile(final Path path) {
        return Files.isRegularFile(path) && path.toFile().exists();
    }

    private static List<OptionProcessor> createOptionProcessorsForFile(final List<OptionProcessor> optionProcessors) {
        return optionProcessors.stream()
                               .map(OptionProcessor::copy)
                               .toList();
    }

    private static void doProcessing(final FileStreamer fileStreamer,
                                     final List<OptionProcessor> optionProcessorsForFile) {
        fileStreamer.applyProcessors(optionProcessorsForFile);
    }

    private void writeResultsForFile(final String arg,
                                     final List<OptionProcessor> optionProcessorsForFile,
                                     final StringBuilder sb) {
        for (int idx = 0; idx < optionProcessorsForFile.size(); idx++) {
            final long stat = optionProcessorsForFile.get(idx).getStat();
            sb.append(String.format("%8s", stat));
        }
        sb.append("     ");
        sb.append(arg);
        sb.append("\n");
    }

    private void writeNoSuchFileMsg(final String arg, final StringBuilder sb) {
        sb.append(String.format("%s - No such file%n", arg));
    }

    private static void updateTotals(final List<OptionProcessor> optionProcessorsForFile, final long[] totals) {
        for (int idx = 0; idx < optionProcessorsForFile.size(); idx++) {
            final long stat = optionProcessorsForFile.get(idx).getStat();
            totals[idx] += stat;
        }
    }

    private void writeTotals(final long[] totals,
                             final StringBuilder sb) {
        for (int idx = 0; idx < totals.length; idx++) {
            sb.append(String.format("%8s", totals[idx]));
        }

        sb.append("     ");
        sb.append("---Total---");
        sb.append("\n");
    }

    private void printOutput(final StringBuilder sb) {
        System.out.println(sb);
    }
}
