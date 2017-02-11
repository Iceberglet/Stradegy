package com.stradegy.history.analyser;

import com.stradegy.history.analyser.indicators.Indicator;
import com.stradegy.history.analyser.strategies.Strategy;

import java.util.*;

/**
 * Created by Iceberglet on 16/1/2017.
 */

public class MarketDataContainerImpl implements MarketDataContainer{

	private static final int cacheSize = 300;

	List<Strategy> subscribers;

	List<MarketDayData> history;

	List<Indicator> indicators;

	public MarketDataContainerImpl(){
		this.subscribers = new ArrayList<>();
		this.history = new ArrayList<>();
		this.indicators = new ArrayList<>();
	}

	@Override
	public void subscribeStrategy(Strategy strategy) {
		this.subscribers.add(strategy);
		this.indicators.addAll(strategy.getIndicators());
	}

	@Override
	public void feed(MarketDayData data) {
		this.history.add(data);
		this.indicators.forEach(i->i.update(this));
		this.subscribers.forEach(s->s.update(this));

		//Remove Redundant History
		if(this.history.size() > cacheSize){
			Iterator<MarketDayData> iter = this.history.listIterator();
			for(int i = 0; i < cacheSize / 2; i++){
				iter.next();
				iter.remove();
			}
		}
	}

	@Override
	public Double getCurrentPrice() {
		return this.getLast().getCandle().getClose();
	}

	@Override
	public MarketDayData getLast() {
		return this.history.get(this.history.size() - 1);
	}

	@Override
	public MarketDayData getXDaysBefore(int days) throws IndexOutOfBoundsException {
		return this.history.get(this.history.size() - days - 1);
	}

	@Override
	public List<MarketDayData> getLast(int days) throws IndexOutOfBoundsException {
		return this.history.subList(this.history.size() - days, this.history.size());
	}
}
