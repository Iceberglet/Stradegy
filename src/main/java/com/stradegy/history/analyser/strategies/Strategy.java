package com.stradegy.history.analyser.strategies;

import com.stradegy.history.analyser.MarketDataContainer;
import com.stradegy.history.analyser.actions.TradeAction;
import com.stradegy.history.analyser.indicators.Indicator;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.*;

/**
 * Created by User on 16/1/2017.
 */
@NoArgsConstructor
@Getter
public abstract class Strategy {

//	private Portfolio portfolio;

	private Position position;

	private Double balance;

	protected List<Indicator> indicators;

	public abstract void update(MarketDataContainer marketData);

}
