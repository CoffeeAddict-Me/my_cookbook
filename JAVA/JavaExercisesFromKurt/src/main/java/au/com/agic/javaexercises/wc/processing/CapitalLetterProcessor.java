package au.com.agic.javaexercises.wc.processing;

import org.apache.commons.cli.Option;

class CapitalLetterProcessor extends AbstractOptionProcessor {

    public CapitalLetterProcessor(){
        super(new Option("C", false, "Capitalised word count"));
    }

    private CapitalLetterProcessor(final long count,
                                final Option option) {
        super(count, option);
    }


    @Override
    public void accept(final String line) {
        String[] words = line.split("\\s+");

        // Iterate over each word and check if it starts with a capital letter.
        for (String word : words) {
            if (!word.isEmpty() && Character.isUpperCase(word.charAt(0))) {
                count++;
            }
        }
    }

    @Override
    public OptionProcessor copy() {
        return new CapitalLetterProcessor(getStat(), getOption());
            }
}

