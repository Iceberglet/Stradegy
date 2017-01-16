package com.stradegy.history.analyser;

import com.stradegy.history.analyser.strategies.Strategy;

/**
 * Created by User on 16/1/2017.
 */
public class StrategyEvaluators {

	private MarketData marketData;

	private Strategy strategy;

	public StrategyEvaluators(MarketData marketData, Strategy strategy) {
		this.marketData = marketData;
		this.strategy = strategy;
	}
}
