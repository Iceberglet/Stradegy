package com.stradegy.history.analyser.indicators;

import com.stradegy.fileService.RowRecord;
import com.stradegy.history.analyser.MarketDataContainer;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

/**
 * Created by User on 17/1/2017.
 */
public abstract class Indicator implements RowRecord {

	protected Double value = null;

	protected boolean isReady = false;

	protected String name = "";

	//For Record Purpose
	protected Long currentRecordId;

	public boolean isReady() {
		return isReady;
	}

	public Double getValue() {
		if(!isReady)
			return null;
		else return value;
	}

	public void update(MarketDataContainer marketDataContainer){
		this.currentRecordId = marketDataContainer.getLast().getDay().getEnd();
	}

	@Override
	public Long getId() {
		return currentRecordId;
	}

	protected void setName(String name){
		this.name = name;
	}

	@Override
	public TreeMap<String, Object> toRowData() {
		TreeMap<String, Object> res = new TreeMap<>();
		res.put(this.getClass().getSimpleName() + this.name, this.value);
		return res;
	}
}
