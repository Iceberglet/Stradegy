package com.stradegy.quotes;

import com.stradegy.enums.ProductType;

import java.util.Date;

/**
 * Created by User on 10/1/2017.
 */
public abstract class Quote {

	protected Double bid;
	protected Double ask;
	protected Date time;
	protected ProductType productType;

	public Quote(Double bid, Double ask, ProductType productType, Date time) {
		this.bid = bid;
		this.ask = ask;
		this.time = time;
		this.productType = productType;
	}


}
