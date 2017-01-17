package com.stradegy.history.analyser;

import com.stradegy.history.analyser.strategies.Strategy;
import com.stradegy.utils.Day;

import java.util.List;

/**
 * Created by Iceberglet on 16/1/2017.
 */
public interface MarketDataContainer {

	public void subscribeStrategy(Strategy strategy);

	public void advanceTo(Day day);

	public MarketData getLast();

	public List<MarketData> getLatest(int days);
}
