package com.stradegy.history.analyser.strategies;

import com.stradegy.enums.BuySell;
import com.stradegy.history.analyser.MarketDataContainer;
import com.stradegy.history.analyser.Portfolio.Portfolio;
import com.stradegy.history.analyser.actions.TradeAction;
import com.stradegy.history.analyser.indicators.ATRIndicator;
import com.stradegy.history.analyser.indicators.CeilingIndicator;
import com.stradegy.history.analyser.indicators.FloorIndicator;
import com.stradegy.history.analyser.indicators.Indicator;
import com.stradegy.utils.Day;

import java.util.Arrays;
import java.util.List;

/**
 * Created by User on 1/2/2017.
 */
public class TurtleStrategy extends SimpleStrategy {

	ATRIndicator atrIndicator;
	CeilingIndicator ceilingIndicator20;
	FloorIndicator floorIndicator20;
	CeilingIndicator ceilingIndicator55;
	FloorIndicator floorIndicator55;

	public static final double NOTIONAL_RATIO = 0.1;

	public TurtleStrategy(Double portfolioSize) {
		super(new Portfolio(portfolioSize), null);
		atrIndicator = new ATRIndicator(20);
		ceilingIndicator20 = new CeilingIndicator(20);
		floorIndicator20 = new FloorIndicator(20);
		ceilingIndicator55 = new CeilingIndicator(55);
		floorIndicator55 = new FloorIndicator(55);

		this.setIndicators(Arrays.asList(atrIndicator, ceilingIndicator20, floorIndicator20, ceilingIndicator55, floorIndicator55));
	}

	private Double N;					//ATR Value
	private Double notionalValue;
	private Double currentNotional;
	private Boolean previousWasLosing = true;	//need to update
	private Boolean openBuy = false;
	private Double stopLossPrice;
	private Day positionOpenDay = null;

	@Override
	protected boolean shouldOpen(MarketDataContainer marketDataContainer) {
		if(!floorIndicator55.isReady())
			return false;

		N = atrIndicator.getValue();
		notionalValue = this.portfolio.getBalance() * NOTIONAL_RATIO / N;

		if(previousWasLosing){
			//check 20 breakthrough
			if(floorIndicator20.getValue() > marketDataContainer.getCurrentPrice()){
				openBuy = false;
				return true;
			}
			if(ceilingIndicator20.getValue() < marketDataContainer.getCurrentPrice()){
				openBuy = true;
				return true;
			}
		} else {
			//Check 55 breakthrough
			if(floorIndicator55.getValue() > marketDataContainer.getCurrentPrice()){
				openBuy = false;
				return true;
			}
			if(ceilingIndicator55.getValue() < marketDataContainer.getCurrentPrice()){
				openBuy = true;
				return true;
			}
		}
		return false;
	}

	@Override
	protected boolean shouldClose(MarketDataContainer marketDataContainer) {
		if(marketDataContainer.getCurrentPrice() > stopLossPrice && openBuy)
			return true;
		if(marketDataContainer.getCurrentPrice() < stopLossPrice && !openBuy)
			return true;
		return false;
	}

	@Override
	protected TradeAction openPosition(MarketDataContainer marketDataContainer) {
		positionOpenDay = marketDataContainer.getLast().getDay();
		BuySell buySell = openBuy? BuySell.Buy : BuySell.Sell;
		stopLossPrice = marketDataContainer.getCurrentPrice() - 2 * buySell.value * N;
		currentNotional = notionalValue;
		return new TradeAction(null, notionalValue, marketDataContainer.getCurrentPrice(), buySell);
	}

	@Override
	protected TradeAction closePosition(MarketDataContainer marketDataContainer) {
		BuySell buySell = openBuy? BuySell.Sell : BuySell.Buy;
		return new TradeAction(null, currentNotional, marketDataContainer.getCurrentPrice(), buySell);
	}

	@Override
	protected boolean shouldAddOpen(MarketDataContainer marketDataContainer) {
		return super.shouldAddOpen(marketDataContainer);
	}

	@Override
	protected boolean shouldReduceOpen(MarketDataContainer marketDataContainer) {
		return super.shouldReduceOpen(marketDataContainer);
	}

	@Override
	protected TradeAction addOpenPosition(MarketDataContainer marketDataContainer) {
		BuySell buySell = openBuy? BuySell.Buy : BuySell.Sell;
		stopLossPrice += 0.5 * buySell.value * N;
		currentNotional += notionalValue;
		return new TradeAction(null, notionalValue, marketDataContainer.getCurrentPrice(), buySell);
	}

	@Override
	protected TradeAction reduceOpenPosition(MarketDataContainer marketDataContainer) {
		return super.reduceOpenPosition(marketDataContainer);
	}
}
