package com.stradegy.history.analyser.Portfolio;

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

	public Position combine(Position other){
		return new Position(this.notional + other.notional,
				(this.notional * this.averagePrice + other.notional * other.averagePrice) / (this.notional + other.notional));
	}

}
