package com.stradegy.history.quotes;

import com.stradegy.enums.Product;
import com.stradegy.enums.ProductType;

/**
 * Created by User on 10/1/2017.
 */
public class BaseQuote {

	protected final Double open;
	protected final Double high;
	protected final Double low;
	protected final Double close;
	protected final Double volume;
	protected final Long timestamp;
	protected final Product product;

	public BaseQuote(Double open, Double high, Double low, Double close, Double volume, Long timestamp, Product product) {
		this.open = open;
		this.high = high;
		this.low = low;
		this.close = close;
		this.volume = volume;
		this.timestamp = timestamp;
		this.product = product;
	}

	public Double getOpen() {
		return open;
	}

	public Double getHigh() {
		return high;
	}

	public Double getLow() {
		return low;
	}

	public Double getClose() {
		return close;
	}

	public Double getVolume() {
		return volume;
	}

	public Long getTimestamp() {
		return timestamp;
	}

	public Product Product() {
		return product;
	}
}
