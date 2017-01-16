package com.stradegy.enums;

/**
 * Created by User on 16/1/2017.
 */
public enum BuySell {
	Buy(1),
	Sell(-1);

	public final int value;

	private BuySell(int v){
		this.value = v;
	}
}
