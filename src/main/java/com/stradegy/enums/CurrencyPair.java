package com.stradegy.enums;

/**
 * Created by User on 10/1/2017.
 */
public enum CurrencyPair {

	USDJPY,
	GBPUSD,
	EURUSD;

	public Currency getFirst(){
		return Currency.valueOf(this.name().substring(0, 3));
	}

	public Currency getSecond(){
		return Currency.valueOf(this.name().substring(3, 6));
	}

	public Currency getNonUSDCurrency(){
		Currency first = this.getFirst();
		Currency second = this.getSecond();
		Currency target = null;
		if(first.equals(Currency.USD)){
			target = second;
		} else if(second.equals(Currency.USD)){
			target = first;
		} else throw new IllegalArgumentException("Invalid Currency Pair " + this.name() + ". It Must Contain USD");
		return target;
	}
}
