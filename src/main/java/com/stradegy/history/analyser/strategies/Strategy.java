package com.stradegy.history.analyser.strategies;

import com.stradegy.enums.Currency;
import com.stradegy.enums.Product;
import com.stradegy.history.analyser.MarketData;
import com.stradegy.history.analyser.actions.TradeAction;

import java.util.*;

/**
 * Created by User on 16/1/2017.
 */
public abstract class Strategy {

	private Portfolio portfolio;

	public Strategy(List<Product> products){
		this.portfolio = new Portfolio(products, 10000D, Currency.SGD);
	}

	public abstract Collection<TradeAction> marketMoves(MarketData marketData);

	public Double evaluate(MarketData marketData){
		return this.portfolio.netWorth(marketData);
	}
}
