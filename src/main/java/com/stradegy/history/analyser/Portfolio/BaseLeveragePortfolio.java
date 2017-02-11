package com.stradegy.history.analyser.Portfolio;

import com.stradegy.history.analyser.MarketDataContainer;
import lombok.Getter;

import java.util.Set;

/**
 * Created by User on 7/2/2017.
 */
@Getter
public abstract class BaseLeveragePortfolio {

	protected int leverage;
	protected MarketDataContainer marketData;
	protected Set<Position> positionList;

	//Returns null if cannot be done
	public abstract Position addPosition(Double notional);

	public abstract void closePosition(Position position);

	public abstract Double getNetWorth();

	//Done before any booking.
	public abstract Double getMaxNotionalBookable();

	//Called on every new market data. Used to conduct margin checks
	public abstract void update(MarketDataContainer marketDataContainer);
}
