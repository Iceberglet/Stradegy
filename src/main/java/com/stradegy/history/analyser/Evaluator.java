package com.stradegy.history.analyser;


import com.stradegy.dao.HibernateDao;
import com.stradegy.enums.Product;
import com.stradegy.fileService.CSVAssembler;
import com.stradegy.history.analyser.strategies.EmptyStrategy;
import com.stradegy.history.analyser.strategies.MovingAverageStrategy;
import com.stradegy.history.analyser.strategies.NullStrategy;
import com.stradegy.history.analyser.strategies.SimpleMovingAverageStrategy;
import com.stradegy.history.quotes.BaseQuote;
import com.stradegy.utils.Day;
import org.springframework.util.CollectionUtils;

import java.util.List;

/**
 * Created by Iceberglet on 24/1/2017.
 */
public class Evaluator {

	public static void evaluate(HibernateDao hibernateDao){
//		MovingAverageStrategy strategy = new MovingAverageStrategy(26, 12, 9, 60, 30, 24);
		SimpleMovingAverageStrategy strategy = new SimpleMovingAverageStrategy(80, 45, 10);


		MarketDataContainer marketDataContainer = new MarketDataContainerImpl();
		marketDataContainer.subscribeStrategy(strategy);

		Product product = Product.XAUUSD;
		Long timeStamp = product.recordStart;
		while(timeStamp < product.recordEnd){
			Day day = (new Day(timeStamp)).addDay(1);
			List<BaseQuote> quotesForTheDay = hibernateDao.query(day.getStart(), day.getEnd(), product);
			if(!CollectionUtils.isEmpty(quotesForTheDay)){
				marketDataContainer.feed(new MarketDayData(day, quotesForTheDay));
			}
			timeStamp = day.getEnd();
		}
	}


	public static void testIndicatorsAndHistoricalData(HibernateDao hibernateDao){
		for(Product product : Product.values()){
			CSVAssembler csvAssembler = new CSVAssembler();
			EmptyStrategy emptyStrategy = new EmptyStrategy(csvAssembler);
			MarketDataContainer marketDataContainer = new MarketDataContainerImpl();
			marketDataContainer.subscribeStrategy(emptyStrategy);
			Long timeStamp = product.recordStart;
			while(timeStamp < product.recordEnd){
				Day day = (new Day(timeStamp)).addDay(1);
				List<BaseQuote> quotesForTheDay = hibernateDao.query(day.getStart(), day.getEnd(), product);
				if(!CollectionUtils.isEmpty(quotesForTheDay)){
					marketDataContainer.feed(new MarketDayData(day, quotesForTheDay));
				}
				timeStamp = day.getEnd();
				System.out.println("Tested Another Day: " + day.toString());
			}
			csvAssembler.toJSFile(product + ".js", product.name());
		}
	}
}
