package com.stradegy.history.analyser;

import com.stradegy.enums.Product;
import com.stradegy.history.analyser.strategies.Strategy;
import com.stradegy.history.quotes.BaseQuote;
import com.stradegy.utils.Day;

import java.util.List;

/**
 * Created by Iceberglet on 16/1/2017.
 */
public interface MarketDataContainer {

	void subscribeStrategy(Strategy strategy);

	void feed(MarketDayData data);

	MarketDayData getLast();

	MarketDayData getXDaysBefore(int days);

	List<MarketDayData> getLast(int days);

	Double getCurrentPrice();
}
