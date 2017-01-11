package com.stradegy.quotes;

import com.stradegy.enums.CurrencyPair;
import com.stradegy.enums.ProductType;

import java.util.Date;

/**
 * Created by User on 10/1/2017.
 */
public class FxQuote extends Quote {

	public final CurrencyPair currencyPair;

	public FxQuote(Double bid, Double ask, ProductType productType, Date time, CurrencyPair currencyPair) {
		super(bid, ask, productType, time);
		this.currencyPair = currencyPair;
	}

	@Override
	public boolean equals(Object another){
		if(another == null)
			return false;
		if(another instanceof FxQuote){
			FxQuote other = (FxQuote)another;
			return this.currencyPair.equals(other.currencyPair) && this.time.equals(other.time);
		}
		else return false;
	}

	@Override
	public int hashCode(){
		return this.currencyPair.hashCode() * this.time.hashCode();
	}
}
