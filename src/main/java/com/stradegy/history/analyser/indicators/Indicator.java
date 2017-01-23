package com.stradegy.history.analyser.indicators;

import com.stradegy.history.analyser.MarketDataContainer;

/**
 * Created by User on 17/1/2017.
 */
public abstract class Indicator {

	protected Double value = null;

	protected boolean isReady = false;

	public boolean isReady() {
		return isReady;
	}

	public Double getValue() {
		if(!isReady)
			return null;
		else return value;
	}

	public abstract void update(MarketDataContainer marketDataContainer);
}
