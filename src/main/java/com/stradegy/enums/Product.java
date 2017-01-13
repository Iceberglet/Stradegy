package com.stradegy.enums;

/**
 * Created by User on 13/1/2017.
 */
public enum Product {
	AUDUSD(Currency.USD, "AUDUSD", ProductType.FOREX),
	EURUSD(Currency.USD, "EURUSD", ProductType.FOREX),
	GBPUSD(Currency.USD, "GBPUSD", ProductType.FOREX),
	USDJPY(Currency.JPY, "AUDUSD", ProductType.FOREX),
	USDSGD(Currency.USD, "AUDUSD", ProductType.FOREX),
	NZDUSD(Currency.USD, "AUDUSD", ProductType.FOREX),

	GBRIDXGBP(Currency.GBP, "FTSE 100", ProductType.INDEX),
	HKGIDXHKD(Currency.HKD, "HK Hang Seng IDX", ProductType.INDEX),
	JPNIDXJPY(Currency.JPY, "Nikkei 225", ProductType.INDEX),
	USA30IDXUSD(Currency.USD, "Dow Jones 30", ProductType.INDEX),
	USA500IDXUSD(Currency.USD, "S&P 500", ProductType.INDEX),
	USACOMIDXUSD(Currency.USD, "Nasdaq", ProductType.INDEX),
	USAMJRIDXUSD(Currency.USD, "S&P 500 Major", ProductType.INDEX),
	USATECHIDXUSD(Currency.USD, "Nasdaq 100 Technical", ProductType.INDEX),

	BRENTCMDUSD(Currency.USD, "Brent Crude Oil", ProductType.COMMODITIES),
	XAGUSD(Currency.USD, "Silver", ProductType.COMMODITIES),
	XAUUSD(Currency.USD, "Gold", ProductType.COMMODITIES);

	//Currency used to buy and sell
	public final Currency CURRENCY;
	public final String NAME;
	public final ProductType MARKET_TYPE;
	Product(Currency CURRENCY, String NAME, ProductType MARKET_TYPE){
		this.CURRENCY = CURRENCY;
		this.NAME = NAME;
		this.MARKET_TYPE = MARKET_TYPE;
	}
}
