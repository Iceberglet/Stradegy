package com.stradegy.history.analyser.strategies;

import com.stradegy.fileService.CSVAssembler;
import com.stradegy.history.analyser.MarketDataContainer;
import com.stradegy.history.analyser.Portfolio.Portfolio;
import com.stradegy.history.analyser.indicators.*;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * Created by User on 11/2/2017.
 */
public class EmptyStrategy extends Strategy{


	CSVAssembler csvAssembler;


	public EmptyStrategy(CSVAssembler csvAssembler) {
		super(new Portfolio(10000D), null);
		this.setIndicators(new ArrayList<>());
		this.csvAssembler = csvAssembler;
	}

	@Override
	public void update(MarketDataContainer marketData) {
		csvAssembler.addRowRecord(marketData.getLast());
	}
}