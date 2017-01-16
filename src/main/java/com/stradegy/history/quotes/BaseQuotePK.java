package com.stradegy.history.quotes;

import com.stradegy.enums.Product;

import java.io.Serializable;

/**
 * Created by User on 16/1/2017.
 */
public class BaseQuotePK implements Serializable {

	protected Long timestamp;
	protected Product product;
	public BaseQuotePK(){}

	public BaseQuotePK(Long timestamp, Product product) {
		this.timestamp = timestamp;
		this.product = product;
	}
}
