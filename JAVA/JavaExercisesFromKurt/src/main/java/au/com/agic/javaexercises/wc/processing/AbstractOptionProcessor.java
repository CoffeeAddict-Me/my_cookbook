package au.com.agic.javaexercises.wc.processing;

import org.apache.commons.cli.Option;

public abstract class AbstractOptionProcessor implements OptionProcessor {
    protected final Option option;
    protected long count;

    public AbstractOptionProcessor(final Option option) {
        this.count = 0;
        this.option = option;
    }

    AbstractOptionProcessor(final long count,
                            final Option option) {
        this.count = count;
        this.option = option;
    }

    @Override
    public long getStat() {
        return count;
    }

    @Override
    public Option getOption() {
        return option;
    }
}
