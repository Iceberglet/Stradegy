package com.stradegy.history.analyser.indicators;

import com.stradegy.history.analyser.MarketDataContainer;

/**
 * Created by User on 17/1/2017.
 */
public abstract class Indicator {

	protected Double value;

	public abstract void update(MarketDataContainer marketDataContainer);
}
