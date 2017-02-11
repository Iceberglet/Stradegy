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
	EMAIndicator emaIndicator1;
	EMAIndicator emaIndicator2;
	EMAIndicator emaIndicator3;
	EMAIndicator emaIndicator4;
	MACDIndicator macdIndicator;

	CSVAssembler csvAssembler;


	public NullStrategy(CSVAssembler csvAssembler) {
		super(new Portfolio(10000D), null);

//		floorIndicator = new FloorIndicator(20);
//		ceilingIndicator = new CeilingIndicator(20);
		atrIndicator = new ATRIndicator(20);
		emaIndicator1 = new EMAIndicator(20, "_20");
		emaIndicator2 = new EMAIndicator(40, "_40");
		emaIndicator3 = new EMAIndicator(80, "_80");
		emaIndicator4 = new EMAIndicator(120, "_120");
//		macdIndicator = new MACDIndicator(12, 26, 9);

		setIndicators(Arrays.asList( atrIndicator, emaIndicator1, emaIndicator2, emaIndicator3, emaIndicator4));

		this.csvAssembler = csvAssembler;
	}

	@Override
	public void update(MarketDataContainer marketData) {
		csvAssembler.addRowRecord(marketData.getLast());
//		if(floorIndicator.isReady())
//			csvAssembler.addRowRecord(floorIndicator);
//		if(ceilingIndicator.isReady())
//			csvAssembler.addRowRecord(ceilingIndicator);
		if(atrIndicator.isReady())
			csvAssembler.addRowRecord(atrIndicator);
		if(emaIndicator1.isReady())
			csvAssembler.addRowRecord(emaIndicator1);
		if(emaIndicator2.isReady())
			csvAssembler.addRowRecord(emaIndicator2);
		if(emaIndicator3.isReady())
			csvAssembler.addRowRecord(emaIndicator3);
		if(emaIndicator4.isReady())
			csvAssembler.addRowRecord(emaIndicator4);
//		if(macdIndicator.isReady())
//			csvAssembler.addRowRecord(macdIndicator);
	}
}
