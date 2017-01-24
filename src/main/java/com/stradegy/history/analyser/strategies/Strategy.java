package com.stradegy.history.analyser.strategies;

import com.stradegy.history.analyser.MarketDataContainer;
import com.stradegy.history.analyser.actions.TradeAction;
import com.stradegy.history.analyser.indicators.Indicator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.*;

/**
 * Created by User on 16/1/2017.
 */
@AllArgsConstructor
@Getter
public abstract class Strategy {

	protected final Portfolio portfolio;

//	protected Position position;

//	protected Double balance;

	protected final List<Indicator> indicators;

	public abstract void update(MarketDataContainer marketData);

}
