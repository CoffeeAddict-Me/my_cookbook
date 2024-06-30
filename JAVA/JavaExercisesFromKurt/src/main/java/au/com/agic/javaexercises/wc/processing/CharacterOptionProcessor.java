package au.com.agic.javaexercises.wc.processing;

import org.apache.commons.cli.Option;

final class CharacterOptionProcessor extends AbstractOptionProcessor {

    public CharacterOptionProcessor() {
        super(new Option("c", false, "Character Count"));
    }

    private CharacterOptionProcessor(final long count,
                                     final Option option) {
        super(count, option);
    }


    @Override
    public void accept(final String line) {
        count += line.length();
    }

    @Override
    public OptionProcessor copy() {
        return new CharacterOptionProcessor(getStat(), getOption());
    }
}