package com.stradegy.history.analyser.strategies;

import com.stradegy.enums.Currency;
import com.stradegy.enums.Product;
import com.stradegy.history.analyser.MarketDataContainer;
import com.stradegy.history.analyser.actions.TradeAction;

import java.util.HashMap;
import java.util.List;

/**
 * Created by User on 16/1/2017.
 */
public class Portfolio {
	HashMap<Product, Position> positions;
	Currency currency;
	Double balance;
	final Double originalBalance;

	public Portfolio(List<Product> products, Double balance, Currency currency){
		this.positions = new HashMap<>();
		for(Product product : products){
			this.positions.put(product, new Position(0D, 0D));
		}
		this.balance = balance;
		this.originalBalance = balance;
		this.currency = currency;
	}

	public void update(TradeAction action){
		Position position = this.positions.get(action.getProduct());
		if(position == null){
			Double notional = action.getNotional() * action.getBuySell().value;
			position = new Position(notional, action.getPrice());
			this.positions.put(action.getProduct(), position);
		} else {

		}


		this.balance -= action.getBuySell().value * action.getPrice() * action.getNotional();

	}

	public Double getBalance(){
		return this.balance;
	}

	public Double netWorth(MarketDataContainer marketData){
		return null;
	}
}
