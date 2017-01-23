package com.stradegy.history.analyser.indicators;

import com.stradegy.history.analyser.MarketDataContainer;

/**
 * Created by Iceberglet on 21/1/2017.
 */
public class EMAIndicator extends Indicator {

	public final int trackingDays;
	public final Double multiplier;

	public EMAIndicator(int trackingDays) {
		this.trackingDays = trackingDays;
		this.multiplier = 2.0D / (1 + trackingDays);
	}

	@Override
	public void update(MarketDataContainer marketDataContainer) {
		if(this.value == null){
			try{
				//Get SMA as the first average value
				this.value = marketDataContainer.getLast(trackingDays).stream()
						.map(a->a.getCandle().getClose())
						.reduce(0D, (a, b)->a + b) / this.trackingDays;
				this.isReady = true;
			} catch (IndexOutOfBoundsException e){
				//Do nothing, pass
			}
		} else {
			this.value = (marketDataContainer.getLast().getCandle().getClose() - this.value) * this.multiplier + this.value;
		}
	}
}
