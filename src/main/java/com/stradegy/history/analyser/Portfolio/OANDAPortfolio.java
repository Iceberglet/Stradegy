package com.stradegy.history.analyser.Portfolio;

import com.stradegy.history.analyser.MarketDataContainer;

import java.util.ArrayList;
import java.util.HashSet;

/**
 * Created by User on 7/2/2017.
 */
public class OANDAPortfolio extends BaseLeveragePortfolio {

	private Double totalAsset;	//=Initial + Realized PnL
	private Double usedMargin;

	public OANDAPortfolio(Double initialBalance, int leverage, MarketDataContainer marketDataContainer) {
		this.totalAsset = initialBalance;
		this.usedMargin = 0D;
		this.leverage = leverage;
		this.positionList = new HashSet<>();
	}

	@Override
	public Position addPosition(Double notional) {
		Position newPosition = new Position(notional, marketData.getCurrentPrice());
		Double delta = Math.abs(newPosition.getValue()) / this.leverage;
		if(this.getAvailableMargin() < delta){
			return null;
		}
		else {
			this.usedMargin += delta;
			this.positionList.add(newPosition);
			return newPosition;
		}
	}

	@Override
	public void closePosition(Position position) {
		if(this.positionList.remove(position)){
			//Restores margin info
			this.usedMargin -= Math.abs(position.getValue());
			//updates balance
			this.totalAsset += position.getNotional() * (marketData.getCurrentPrice() - position.getAveragePrice());
		}
	}

	@Override
	public Double getNetWorth() {
		Double unrealizedPnL = 0D;
		return this.totalAsset + unrealizedPnL;
	}

	@Override
	public Double getMaxNotionalBookable() {
		return null;
	}

	protected Double getAvailableMargin(){
		return this.getNetWorth() - this.usedMargin;
	}

	@Override
	public void update(MarketDataContainer marketDataContainer) {

	}
}
