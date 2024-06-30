package au.com.agic.javaexercises.wc.processing;

import org.apache.commons.cli.Option;

final class LineOptionProcessor extends AbstractOptionProcessor {

    public LineOptionProcessor() {
        super(new Option("l", false, "Line count"));
    }

    private LineOptionProcessor(final long count,
                                final Option option) {
        super(count, option);
    }

    @Override
    public void accept(final String line) {
        count++;
    }

    @Override
    public OptionProcessor copy() {
        return new LineOptionProcessor(getStat(), getOption());
    }
}