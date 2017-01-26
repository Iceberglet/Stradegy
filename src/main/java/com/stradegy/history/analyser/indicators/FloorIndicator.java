package com.stradegy.history.analyser.indicators;

import com.stradegy.history.analyser.MarketDataContainer;
import com.stradegy.history.quotes.BaseQuote;

/**
 * Created by Iceberglet on 17/1/2017.
 */
public class FloorIndicator extends Indicator{

	public final int trackingDays;

	public FloorIndicator(int trackingDays){
		this.trackingDays = trackingDays;
	}

	@Override
	public void update(MarketDataContainer marketDataContainer) {
		super.update(marketDataContainer);

		if(this.value != null){
			this.value = marketDataContainer.getLast(trackingDays).stream()
					.map(a->a.getCandle().getLow())
					.reduce(Double.MAX_VALUE, Math::min);
		}

		else try {
			this.value = marketDataContainer.getLast(trackingDays).stream()
					.map(a->a.getCandle().getLow())
					.reduce(Double.MAX_VALUE, Math::min);
			this.isReady = true;
		} catch (IndexOutOfBoundsException e) {
			this.value = null;
		}
	}
}
