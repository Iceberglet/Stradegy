package com.stradegy.history.analyser.strategies;

import com.stradegy.history.analyser.MarketDataContainer;
import com.stradegy.history.analyser.Portfolio.Portfolio;
import com.stradegy.history.analyser.actions.TradeAction;
import com.stradegy.history.analyser.indicators.Indicator;

import java.util.List;

/**
 * Created by Iceberglet on 31/1/2017.
 */
public abstract class SimpleStrategy extends Strategy {

	public SimpleStrategy(Portfolio portfolio, List<Indicator> indicators) {
		super(portfolio, indicators);
	}

	@Override
	public void update(MarketDataContainer marketData) {
		if(hasOpen()){
			if(this.shouldAddOpen(marketData))
				this.portfolio.update(this.addOpenPosition(marketData));
			else if(this.shouldReduceOpen(marketData))
				this.portfolio.update(this.reduceOpenPosition(marketData));
			else if(this.shouldClose(marketData))
				this.portfolio.update(this.closePosition(marketData));
		}
		else {
			if(this.shouldOpen(marketData))
				this.portfolio.update(this.openPosition(marketData));
		}
	}

	protected boolean hasOpen(){
		return Double.compare(this.portfolio.getBalance(), 0) != 0;
	}

	protected abstract boolean shouldOpen(MarketDataContainer marketDataContainer);

	protected abstract boolean shouldClose(MarketDataContainer marketDataContainer);

	protected abstract TradeAction openPosition(MarketDataContainer marketDataContainer);

	protected abstract TradeAction closePosition(MarketDataContainer marketDataContainer);

	protected boolean shouldAddOpen(MarketDataContainer marketDataContainer){
		return false;
	}

	protected boolean shouldReduceOpen(MarketDataContainer marketDataContainer){
		return false;
	}

	protected TradeAction addOpenPosition(MarketDataContainer marketDataContainer){
		return null;
	}

	protected TradeAction reduceOpenPosition(MarketDataContainer marketDataContainer){
		return null;
	}
}
