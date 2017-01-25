package com.stradegy.history.analyser;


import com.stradegy.dao.HibernateDao;
import com.stradegy.enums.Product;
import com.stradegy.history.analyser.strategies.MovingAverageStrategy;
import com.stradegy.history.quotes.BaseQuote;
import com.stradegy.utils.Day;
import org.springframework.util.CollectionUtils;

import java.util.List;

/**
 * Created by Iceberglet on 24/1/2017.
 */
public class Evaluator {

	public static void evaluate(HibernateDao hibernateDao){
		MovingAverageStrategy strategy = new MovingAverageStrategy(10, 6, 3, 26, 12, 9);
		MarketDataContainer marketDataContainer = new MarketDataContainerImpl();
		marketDataContainer.subscribeStrategy(strategy);

		Product product = Product.EURUSD;
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
}
