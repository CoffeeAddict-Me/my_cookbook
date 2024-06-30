package au.com.agic.javaexercises.wc.processing;

import java.util.function.Consumer;

public interface StatisticsAggregator extends Consumer<String>  {

    long getStat();

}
