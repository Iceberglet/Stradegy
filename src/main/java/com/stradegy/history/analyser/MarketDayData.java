package com.stradegy.history.analyser;

import com.stradegy.enums.Product;
import com.stradegy.fileService.RowRecord;
import com.stradegy.history.quotes.BaseQuote;
import com.stradegy.utils.Day;
import lombok.Getter;

import java.util.*;

/**
 * Created by User on 17/1/2017.
 */

@Getter
public class MarketDayData implements RowRecord {

	final Day day;

	final BaseQuote candle;

	//Assuming that the quotes are in ascending order
	public MarketDayData(Day day, List<BaseQuote> quotes) throws IllegalArgumentException {
		if(quotes == null || quotes.size() == 0)
			throw new IllegalArgumentException("Zero quotes are given");

		this.day = day;
		Double open, close, high = Double.MIN_VALUE, low = Double.MAX_VALUE, vol = 0D;
		open = quotes.get(0).getOpen();
		close = quotes.get(quotes.size() - 1).getClose();
		for(BaseQuote baseQuote : quotes){
			high = Math.max(baseQuote.getHigh(), high);
			low = Math.min(baseQuote.getLow(), low);
			vol += baseQuote.getVolume();
		}
		this.candle = new BaseQuote(open, high, low, close, vol, day.getStart(), quotes.get(0).getProduct());
	}

	@Override
	public Long getId() {
		return day.getEnd();
	}

	@Override
	public TreeMap<String, Object> toRowData() {
		TreeMap<String, Object> res = new TreeMap<>();
		res.put("OPEN", candle.getOpen());
		res.put("HIGH", candle.getHigh());
		res.put("LOW", candle.getLow());
		res.put("CLOSE", candle.getClose());
		return res;
	}
}
