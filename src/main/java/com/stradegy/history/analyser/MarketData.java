package com.stradegy.history.analyser;

import com.stradegy.enums.Product;
import com.stradegy.history.quotes.BaseQuote;
import com.stradegy.utils.Day;

import java.util.List;
import java.util.Map;

/**
 * Created by User on 16/1/2017.
 */
//Market Data of ONE day
public class MarketData {

	Day day;

	List<BaseQuote> quotes;

	Map<Product, List<BaseQuote>> recentQuotes;

	Map<Product, BaseQuote> latestQuotes;

	Long earliestTimeStamp;

	Long latestTimeStamp;

	List<Product> products;

	public MarketData(List<Product> products, Long startTime, Long cacheDuration){

	}

	public BaseQuote getPrice(Product product){
		return latestQuotes.get(product);
	}
}
