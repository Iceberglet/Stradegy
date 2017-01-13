package com.stradegy.history.quotes;

import java.util.Collection;

/**
 * Created by User on 11/1/2017.
 */
public class Candle {
	public final Long start;
	public final Long end;
	public final Double low;
	public final Double open;
	public final Double close;
	public final Double high;

	public Candle(Long start, Long end, Double low, Double open, Double close, Double high) {
		this.start = start;
		this.end = end;
		this.low = low;
		this.open = open;
		this.close = close;
		this.high = high;
	}

	public static Candle instantiate(Collection<BaseQuote> quotes){
		Long start = Long.MAX_VALUE;
		Long end = 0L;
		Double low = Double.POSITIVE_INFINITY;
		Double high = 0D;
		Double close = null;
		Double open = null;
		for(BaseQuote timedQuote : quotes){
			if(timedQuote.getTimestamp() < start){
				start = timedQuote.getTimestamp();
				open = timedQuote.getOpen();
			}
			if(timedQuote.getTimestamp() > end){
				end = timedQuote.getTimestamp();
				close = timedQuote.getClose();
			}
			low = Math.min(low, timedQuote.getLow());
			high = Math.min(high, timedQuote.getHigh());
		}
		return new Candle(start, end, low, open, close, high);
	}
}
