package com.stradegy.history.analyser.strategies;

import com.stradegy.enums.Currency;
import com.stradegy.enums.Product;
import com.stradegy.history.analyser.MarketDataContainer;
import com.stradegy.history.analyser.actions.TradeAction;
import lombok.Getter;

import java.util.HashMap;
import java.util.List;

/**
 * Created by User on 16/1/2017.
 */
@Getter
public class Portfolio {
//	HashMap<Product, Position> positions;
//	Currency currency;
	Position position;
	Double balance;
	final Double originalBalance;

	public Portfolio(Double balance){
//		this.positions = new HashMap<>();
//		for(Product product : products){
//			this.positions.put(product, new Position(0D, 0D));
//		}
		this.position = new Position(0D, 0D);
		this.balance = balance;
		this.originalBalance = balance;
//		this.currency = currency;
	}

	public void update(TradeAction action){

//		Position position = this.positions.get(action.getProduct());
		Double notional = action.getNotional() * action.getBuySell().value;
		Position newPosition = new Position(notional, action.getPrice());
		this.position = this.position.combine(newPosition);
//		if(position == null){
//			this.positions.put(action.getProduct(), newPosition);
//		} else {
//			this.positions.put(action.getProduct(), position.combine(newPosition));
//		}

		this.balance -= action.getBuySell().value * action.getPrice() * action.getNotional();
	}

	public Double getBalance(){
		return this.balance;
	}

	public Double netWorth(MarketDataContainer marketData){
		Double price = marketData.getLast().getCandle().getClose();
		return this.balance + /*( this.position.getNotional() > 0? 1 : -1 ) */ this.position.getNotional() * price;
	}
}
