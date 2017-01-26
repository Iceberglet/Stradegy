package com.stradegy.history.analyser.indicators;

import com.stradegy.history.analyser.MarketDataContainer;

import java.util.*;

/**
 * Created by Iceberglet on 21/1/2017.
 */
public class MACDIndicator extends Indicator {

	public final EMAIndicator fastEMA;
	public final EMAIndicator slowEMA;

	//suggested: fast-12, slow-26, signal-9
	public MACDIndicator(int fast, int slow, int lag) {
		if(fast >= slow || lag >= fast){
			throw new IllegalArgumentException("Invalid Time Period Settings");
		}
		this.fastEMA = new EMAIndicator(fast);
		this.slowEMA = new EMAIndicator(slow);
		this.lagDays = lag;
		this.lagMultiplier = 2.0D / (1 + lagDays);
	}

	public final int lagDays;
	public final Double lagMultiplier;
	private List<Double> tempEMALag = new ArrayList<>();
	private Double macdLag;

	@Override
	public void update(MarketDataContainer marketDataContainer) {
		super.update(marketDataContainer);
		if(!this.isReady){
			try{
				//MACDIndicator is fast minus slow.
				this.value = getMACD(marketDataContainer);
				if(this.value != null){
					//Calculate the initial signal (Averaging)
					tempEMALag.add(this.value);
					if(tempEMALag.size() >= this.lagDays){
						tempEMALag.stream().mapToDouble(a -> a).average().ifPresent(v->this.macdLag = v);
						this.isReady = true;
						return;

					} else {
						return;
					}
				}
			} catch (IndexOutOfBoundsException e){
				//Do nothing, pass
			}
		} else {
			this.value = getMACD(marketDataContainer);
			this.macdLag = (this.value - this.macdLag) * lagMultiplier + this.macdLag;
		}
	}

	public Double getMacdLag(){
		return this.macdLag;
	}

	private Double getMACD(MarketDataContainer marketDataContainer){
		this.slowEMA.update(marketDataContainer);
		this.fastEMA.update(marketDataContainer);
		Double slow = this.slowEMA.getValue();
		Double fast = this.fastEMA.getValue();
		if(slow != null && fast != null)
			return fast - slow;
		else return null;
	}

	@Override
	public TreeMap<String, Object> toRowData(){
		TreeMap<String, Object> res = new TreeMap<>();
		res.put(this.getClass().getSimpleName() + "_LAG", this.value);
		res.put(this.getClass().getSimpleName() + "_SIGNAL", this.macdLag);
		return res;
	}
}
