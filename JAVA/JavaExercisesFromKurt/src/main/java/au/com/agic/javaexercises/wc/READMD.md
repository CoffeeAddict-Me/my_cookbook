# WC utility replacement

You are to write a program to provide similar functionality to the
WC utility.

## Requirements
1. Support the `l`, `w` and `c` switches.  If no switches are provided<br>
you are to execute the processing for all the switch options.
2. The program takes a path to a file (you can assume it is text based).
3. Capable of processing huge files; you should not read the entire file into memory in one go.
4. You are to output the result(s) to stdout.
5. Any errors should be written stdout with sensible messages.  As a stretch goal
you could try to use Log4j but configure it to output to stdout.
6. Your code is to be fully tested.

## Restrictions
1. When reading files you should where possible use the classes from the `java.nio` package.

## Hints
1. You could use the [Apache Commons CLI](https://commons.apache.org/proper/commons-cli/)
to assist with the command parsing of the command line arguments.

## Non functionals
1. I will be looking for well structured code, good naming and formatting.
2. I should be able to give your code to anyone else and expect them to be able to<br>
readily understand and describe the operation of your code.