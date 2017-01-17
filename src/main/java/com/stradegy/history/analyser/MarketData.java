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

	public static final int cachedDays = 100;

	private List<MarketDayData> history;

	private Product product;

	Long earliestTimeStamp;

	Long latestTimeStamp;

	List<Product> products;

}
