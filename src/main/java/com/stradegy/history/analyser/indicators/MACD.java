package com.stradegy.history.analyser.indicators;

import com.stradegy.history.analyser.MarketDataContainer;

/**
 * Created by Iceberglet on 21/1/2017.
 */
public class MACD extends Indicator {

	public final int fast;
	public final int slow;
	public final int signal;

	private Double[] slowPast;
	private Double[] fastPast;
	private Double[] signalPast;

	//suggested: fast-12, slow-26, signal-9
	public MACD(int fast, int slow, int signal) {
		if(fast >= slow || signal >= fast){
			throw new IllegalArgumentException("Invalid Time Period Settings");
		}
		this.fast = fast;
		this.slow = slow;
		this.signal = signal;
	}

	@Override
	public void update(MarketDataContainer marketDataContainer) {

	}
}
