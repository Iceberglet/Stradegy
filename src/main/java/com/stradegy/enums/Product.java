package com.stradegy.enums;

import java.util.Date;

/**
 * Created by User on 13/1/2017.
 */
public enum Product {
	AUDUSD(Currency.USD, "AUDUSD", ProductType.FOREX, 1059915600000L, 1484236740000L),
	EURUSD(Currency.USD, "EURUSD", ProductType.FOREX, 1052064000000L, 1484236740000L),
	GBPUSD(Currency.USD, "GBPUSD", ProductType.FOREX, 1052064000000L, 1484236740000L),
	USDJPY(Currency.JPY, "USDJPY", ProductType.FOREX, 1052064000000L, 1484236740000L),
	USDSGD(Currency.USD, "USDSGD", ProductType.FOREX, 1100620800000L, 1484236740000L),
	NZDUSD(Currency.USD, "NZDUSD", ProductType.FOREX, 1059915600000L, 1484236740000L),

	GBRIDXGBP(Currency.GBP, "FTSE 100", ProductType.INDEX, 1357068600000L, 1484226000000L),
	HKGIDXHKD(Currency.HKD, "HK Hang Seng IDX", ProductType.INDEX, 1357057680000L, 1484207040000L),
	JPNIDXJPY(Currency.JPY, "Nikkei 225", ProductType.INDEX, 1357068600000L, 1484226000000L),
	USA30IDXUSD(Currency.USD, "Dow Jones 30", ProductType.INDEX, 1357108200000L, 1484226000000L),
	USA500IDXUSD(Currency.USD, "S&P 500", ProductType.INDEX, 1357109400000L, 1484226000000L),
	USACOMIDXUSD(Currency.USD, "Nasdaq", ProductType.INDEX, 1357108200000L, 1399636800000L),
	USAMJRIDXUSD(Currency.USD, "S&P 500 Major", ProductType.INDEX, 1357068600000L, 1399872600000L),
	USATECHIDXUSD(Currency.USD, "Nasdaq 100 Technical", ProductType.INDEX, 1357108200000L, 1484226000000L),

	BRENTCMDUSD(Currency.USD, "Brent Crude Oil", ProductType.COMMODITIES, 1293980460000L, 1484229540000L),
	XAGUSD(Currency.USD, "Silver", ProductType.COMMODITIES, 1052067600000L, 1484236740000L),
	XAUUSD(Currency.USD, "Gold", ProductType.COMMODITIES, 1052064060000L, 1484236740000L);

	//Currency used to buy and sell
	public final Currency CURRENCY;
	public final String NAME;
	public final ProductType MARKET_TYPE;
	public final Long recordStart;
	public final Long recordEnd;
	Product(Currency CURRENCY, String NAME, ProductType MARKET_TYPE, Long start, Long end){
		this.CURRENCY = CURRENCY;
		this.NAME = NAME;
		this.MARKET_TYPE = MARKET_TYPE;
		this.recordEnd = end;
		this.recordStart = start;
	}
}
