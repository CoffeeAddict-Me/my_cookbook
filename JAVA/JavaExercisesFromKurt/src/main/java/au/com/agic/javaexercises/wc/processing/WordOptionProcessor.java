package au.com.agic.javaexercises.wc.processing;

import org.apache.commons.cli.Option;

class WordOptionProcessor extends AbstractOptionProcessor {

    public WordOptionProcessor() {
        super(new Option("w", false, "Word count"));
    }

    private WordOptionProcessor(final long count,
                                final Option option) {
        super(count, option);
    }


    @Override
    public void accept(final String line) {
        count += line.split("\s").length;
    }

    @Override
    public OptionProcessor copy() {
        return new WordOptionProcessor(getStat(), getOption());
    }
}