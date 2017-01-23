package com.stradegy.history.analyser.indicators;

import com.stradegy.history.analyser.MarketDataContainer;

/**
 * Created by Iceberglet on 17/1/2017.
 */
public class CeilingIndicator extends Indicator{

	public final int trackingDays;

	public CeilingIndicator(int trackingDays){
		this.trackingDays = trackingDays;
	}

	@Override
	public void update(MarketDataContainer marketDataContainer) {

		if(this.value != null){
			this.value = Math.max(marketDataContainer.getLast().getCandle().getHigh(), this.value);
		}

		else try {
			this.value = marketDataContainer.getLast(trackingDays).stream()
					.map(a->a.getCandle().getHigh())
					.reduce(Double.MAX_VALUE, Math::max);
			this.isReady = true;
		} catch (IndexOutOfBoundsException e) {
			this.value = null;
		}
	}
}
