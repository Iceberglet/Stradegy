package com.stradegy.history.analyser;

import com.stradegy.history.analyser.strategies.Strategy;
import com.stradegy.utils.Day;

import java.util.HashMap;
import java.util.List;

/**
 * Created by Iceberglet on 16/1/2017.
 */
public class MarketDataContainerImpl implements MarketDataContainer{


	List<Strategy> subscribers;

	HashMap<Day, MarketData> marketDataHashMap;


}
