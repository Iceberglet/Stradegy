package com.stradegy.history.analyser.strategies;

import com.stradegy.history.analyser.MarketDataContainer;
import com.stradegy.history.analyser.Portfolio.Portfolio;
import com.stradegy.history.analyser.indicators.Indicator;
import lombok.AllArgsConstructor;
import lombok.Getter;

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

	protected List<Indicator> indicators;

	protected void setIndicators(List<Indicator> indicators){
		this.indicators = indicators;
	}

	public abstract void update(MarketDataContainer marketData);

}
