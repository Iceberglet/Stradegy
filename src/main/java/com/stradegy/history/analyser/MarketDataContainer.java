package com.stradegy.history.analyser;

import com.stradegy.utils.Day;

/**
 * Created by Iceberglet on 16/1/2017.
 */
public interface MarketDataContainer {

	public MarketData get(Day date);
}
