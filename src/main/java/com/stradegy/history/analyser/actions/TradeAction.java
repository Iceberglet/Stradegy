package com.stradegy.history.analyser.actions;

import com.stradegy.enums.BuySell;
import com.stradegy.enums.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by User on 16/1/2017.
 */

@AllArgsConstructor
@Getter
@Setter
public class TradeAction {

	public final Product product;
	public final Double notional;
	public final Double price;
	public final BuySell buySell;

}
