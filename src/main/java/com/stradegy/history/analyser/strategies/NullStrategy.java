package com.stradegy.history.analyser.strategies;


import com.stradegy.fileService.CSVAssembler;
import com.stradegy.history.analyser.MarketDataContainer;
import com.stradegy.history.analyser.Portfolio.Portfolio;
import com.stradegy.history.analyser.indicators.*;

import java.util.Arrays;
import java.util.List;

/**
 * Created by User on 26/1/2017.
 */
public class NullStrategy extends Strategy{

	FloorIndicator floorIndicator;
	CeilingIndicator ceilingIndicator;
	ATRIndicator atrIndicator;
	EMAIndicator emaIndicator;
	MACDIndicator macdIndicator;

	CSVAssembler csvAssembler;


	public NullStrategy(CSVAssembler csvAssembler) {
		super(new Portfolio(10000D), null);

		floorIndicator = new FloorIndicator(20);
		ceilingIndicator = new CeilingIndicator(20);
		atrIndicator = new ATRIndicator(20);
		emaIndicator = new EMAIndicator(20);
		macdIndicator = new MACDIndicator(12, 26, 9);

		setIndicators(Arrays.asList( floorIndicator, ceilingIndicator,atrIndicator, emaIndicator, macdIndicator));

		this.csvAssembler = csvAssembler;
	}

	@Override
	public void update(MarketDataContainer marketData) {
		csvAssembler.addRowRecord(marketData.getLast());
		if(floorIndicator.isReady())
			csvAssembler.addRowRecord(floorIndicator);
		if(ceilingIndicator.isReady())
			csvAssembler.addRowRecord(ceilingIndicator);
		if(atrIndicator.isReady())
			csvAssembler.addRowRecord(atrIndicator);
		if(emaIndicator.isReady())
			csvAssembler.addRowRecord(emaIndicator);
		if(macdIndicator.isReady())
			csvAssembler.addRowRecord(macdIndicator);
	}
}
