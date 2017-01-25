package com.stradegy.history.analyser.strategies;

import com.stradegy.ApplicationConstants;
import com.stradegy.enums.BuySell;
import com.stradegy.history.analyser.MarketDataContainer;
import com.stradegy.history.analyser.actions.TradeAction;
import com.stradegy.history.analyser.indicators.ATRIndicator;
import com.stradegy.history.analyser.indicators.MACDIndicator;
import com.stradegy.utils.Logger;

import java.util.Arrays;

/**
 * Created by User on 25/1/2017.
 */
public class SimpleMovingAverageStrategy extends Strategy {

	private Double prevSignal;
	private Double prevLag;

	private Double notionalRatio = 0.2;

	public SimpleMovingAverageStrategy(int slow, int fast, int signal){
		super(new Portfolio(10000D), Arrays.asList(new MACDIndicator(fast, slow, signal), new ATRIndicator(20)));
	}

	@Override
	public void update(MarketDataContainer marketData) {
		MACDIndicator macd = (MACDIndicator)this.indicators.get(0);
		ATRIndicator atr = (ATRIndicator) this.indicators.get(1);

		if(!macd.isReady() || !atr.isReady())
			return;

//		Logger.emit(this.getClass().getSimpleName(), marketData.getLast().getDay() + " - Received New Market Data, Current Portfolio: " + this.portfolio.netWorth(marketData));

		Double currentPrice = marketData.getLast().getCandle().getClose();
		Double signal = macd.getSignalEMA();
		Double lag = macd.getValue();

//		Logger.emit(this.getClass().getSimpleName(), signal + " " + lag + " " + longLag + " " + longSignal);

		if(prevLag != null || prevSignal != null){
			//Compare the previous with current, and decide on position to take

			//If currently holding short position
			if(portfolio.getPosition().getNotional() < 0){

				if(signal > lag /* || this.portfolio.getPosition().getAveragePrice() + atr.getValue() > currentPrice*/){
					TradeAction tradeAction = new TradeAction(null, Math.abs(portfolio.getPosition().getNotional()),
							marketData.getLast().getCandle().getClose(), BuySell.Buy);
					this.portfolio.update(tradeAction);
					Logger.emit(this.getClass().getSimpleName(), "Closed Short: " + formateInfo(marketData, lag, signal));
				}
			} else if (portfolio.getPosition().getNotional() > 0){

				if(signal < lag /*|| this.portfolio.getPosition().getAveragePrice() - atr.getValue() > currentPrice*/){
					TradeAction tradeAction = new TradeAction(null, Math.abs(portfolio.getPosition().getNotional()),
							marketData.getLast().getCandle().getClose(), BuySell.Sell);
					this.portfolio.update(tradeAction);
					Logger.emit(this.getClass().getSimpleName(), "Closed Long: " + formateInfo(marketData, lag, signal));
				}
			}


				//Upward Pressure
				if(prevLag > prevSignal && lag < signal){
					Double amount = this.getPortfolio().getBalance() * notionalRatio;
					//If previously holding a short position
//				if(portfolio.getPosition().getNotional() < 0){
//					amount += Math.abs(portfolio.getPosition().getNotional());
//				}
					TradeAction tradeAction = new TradeAction(null, amount,
							marketData.getLast().getCandle().getClose(), BuySell.Buy);
					this.getPortfolio().update(tradeAction);
					Logger.emit(this.getClass().getSimpleName(), "Opened Long: " + formateInfo(marketData, lag, signal));
				}

				//Downward Pressure
				else if (prevLag < prevSignal && lag > signal){
					Double amount = this.getPortfolio().getBalance() * notionalRatio;
					//If previously holding a long position
//				if(portfolio.getPosition().getNotional() > 0){
//					amount += Math.abs(portfolio.getPosition().getNotional());
//				}
					TradeAction tradeAction = new TradeAction(null, amount,
							marketData.getLast().getCandle().getClose(), BuySell.Sell);
					this.getPortfolio().update(tradeAction);
					Logger.emit(this.getClass().getSimpleName(), "Opened Short: " + formateInfo(marketData, lag, signal));

				}

		}
		prevLag = lag;
		prevSignal = signal;
	}

	private String formateInfo(MarketDataContainer marketDataContainer, Double lag, Double signal){
		return ApplicationConstants.FORMAT_PRICE.format(marketDataContainer.getLast().getCandle().getClose()) +
				"\t Net: " + ApplicationConstants.FORMAT_NOTIONAL.format(this.portfolio.netWorth(marketDataContainer)) +
				"\t|" + ApplicationConstants.FORMAT_INDICATOR.format(prevLag) +
				"\t|" + ApplicationConstants.FORMAT_INDICATOR.format(prevSignal) +
				"\t|" + ApplicationConstants.FORMAT_INDICATOR.format(lag) +
				"\t|" + ApplicationConstants.FORMAT_INDICATOR.format(signal);
	}
}
