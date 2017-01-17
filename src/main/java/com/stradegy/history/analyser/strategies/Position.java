package com.stradegy.history.analyser.strategies;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by User on 16/1/2017.
 */

@AllArgsConstructor
@Getter
@Setter
public class Position {

	private Double notional;		//Positive For Buy, Negative For Sell
	private Double averagePrice;
	private Double takeProfit;
	private Double stopLoss;

}
