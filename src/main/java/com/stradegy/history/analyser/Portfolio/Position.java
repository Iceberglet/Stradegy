package com.stradegy.history.analyser.Portfolio;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

/**
 * Created by User on 16/1/2017.
 */

@AllArgsConstructor
@Getter
@Setter
public class Position {

	private final Double notional;		//Positive For Buy, Negative For Sell
	private final Double averagePrice;
	private final String uuid;

	public Position(Double notional, Double price){
		this.notional = notional;
		this.averagePrice = price;
		this.uuid = UUID.randomUUID().toString();
	}

	public Double getValue(){
		return this.notional * this.averagePrice;
	}

	public Position combine(Position other){
		return new Position(this.notional + other.notional,
				(this.notional * this.averagePrice + other.notional * other.averagePrice) / (this.notional + other.notional));
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof Position)) return false;

		Position position = (Position) o;

//		if (notional != null ? !notional.equals(position.notional) : position.notional != null) return false;
		return uuid != null ? uuid.equals(position.uuid) : position.uuid == null;
	}

	@Override
	public int hashCode(){
		return uuid.hashCode();
	}

}
