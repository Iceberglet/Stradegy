package com.stradegy.history.analyser.indicators;

import com.stradegy.history.analyser.MarketDataContainer;
import com.stradegy.history.analyser.MarketDayData;
import com.stradegy.history.quotes.BaseQuote;

/**
 * Created by Iceberglet on 17/1/2017.
 */
public class ATRIndicator extends Indicator{

	public final int trackingDays;

	public ATRIndicator(int trackingDays){
		this.trackingDays = trackingDays;
	}

	@Override
	public void update(MarketDataContainer marketDataContainer) {
		super.update(marketDataContainer);

		if(this.value != null){
			BaseQuote candleToday = marketDataContainer.getLast().getCandle();
			Double closeYesterday = marketDataContainer.getXDaysBefore(1).getCandle().getClose();
			Double ATR = Math.max(candleToday.getHigh()-candleToday.getLow(), candleToday.getHigh() - closeYesterday);
			ATR = Math.max(ATR, closeYesterday - candleToday.getLow());

			this.value = ( ATR + this.value * (trackingDays - 1) ) / trackingDays;
		}

		else try {
			this.value = marketDataContainer.getLast(trackingDays).stream()
					.map(o->o.getCandle().getHigh() - o.getCandle().getLow())
					.reduce(0D, (a, b)->a + b) / trackingDays;
			this.isReady = true;
		} catch (IndexOutOfBoundsException e) {
			this.value = null;
		}
	}
}
