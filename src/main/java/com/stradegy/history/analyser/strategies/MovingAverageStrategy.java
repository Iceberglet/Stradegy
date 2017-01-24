package com.stradegy.history.analyser.strategies;

import com.stradegy.enums.BuySell;
import com.stradegy.history.analyser.MarketDataContainer;
import com.stradegy.history.analyser.actions.TradeAction;
import com.stradegy.history.analyser.indicators.MACDIndicator;

import java.util.Arrays;

/**
 * Created by User on 24/1/2017.
 */
public class MovingAverageStrategy extends Strategy {

	private Double prevSignal;
	private Double prevLag;
	private Double prevLongSignal;
	private Double prevLongLag;

	private Double notionalRatio = 0.2;

	public MovingAverageStrategy(int slow, int fast, int signal, int superSlow, int superFast, int superSignal){
		super(new Portfolio(10000D), Arrays.asList(new MACDIndicator(fast, slow, signal),
														  new MACDIndicator(superFast, superSlow, superSignal)));
	}

	@Override
	public void update(MarketDataContainer marketData) {
		MACDIndicator macd = (MACDIndicator)this.indicators.get(0);
		MACDIndicator macdLongTerm = (MACDIndicator)this.indicators.get(1);
		if(!macd.isReady() || !macdLongTerm.isReady())
			return;

		Double signal = macd.getSignalEMA();
		Double lag = macd.getValue();
		Double longSignal = macdLongTerm.getSignalEMA();
		Double longLag = macdLongTerm.getValue();

		if(prevLag == null || prevSignal == null || prevLongLag == null || prevLongSignal == null){
			prevLag = lag;
			prevSignal = signal;
			prevLongLag = longLag;
			prevLongSignal = longSignal;
		} else {
			//Compare the previous with current, and decide on position to take

			//Upward Pressure
			if(prevLag > prevSignal && lag < signal){
				Double amount = this.getPortfolio().getBalance() * notionalRatio;
				//If previously holding a short position
				if(portfolio.getPosition().getNotional() < 0){
					amount += Math.abs(portfolio.getPosition().getNotional());
				}

				TradeAction tradeAction = new TradeAction(null, amount,
						marketData.getLast().getCandle().getClose(), BuySell.Buy);
				this.getPortfolio().update(tradeAction);
			}

			//Downward Pressure
			else if (prevLag < prevSignal && lag > signal){
				Double amount = this.getPortfolio().getBalance() * notionalRatio;
				//If previously holding a long position
				if(portfolio.getPosition().getNotional() > 0){
					amount += Math.abs(portfolio.getPosition().getNotional());
				}
				TradeAction tradeAction = new TradeAction(null, amount,
						marketData.getLast().getCandle().getClose(), BuySell.Buy);
				this.getPortfolio().update(tradeAction);
			}

			//We only take long pos if it agrees with long term trend

		}
	}
}
