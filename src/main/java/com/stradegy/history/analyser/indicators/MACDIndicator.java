package com.stradegy.history.analyser.indicators;

import com.stradegy.history.analyser.MarketDataContainer;
import lombok.Getter;

import java.util.*;

/**
 * Created by Iceberglet on 21/1/2017.
 */
public class MACDIndicator extends Indicator {

	public final EMAIndicator fastEMA;
	public final EMAIndicator slowEMA;

	//suggested: fast-12, slow-26, signal-9
	public MACDIndicator(int fast, int slow, int signal) {
		if(fast >= slow || signal >= fast){
			throw new IllegalArgumentException("Invalid Time Period Settings");
		}
		this.fastEMA = new EMAIndicator(fast);
		this.slowEMA = new EMAIndicator(slow);
		this.signalDays = signal;
		this.signalMultiplier = 2.0D / (1 + signalDays);
	}

	public final int signalDays;
	public final Double signalMultiplier;
	private List<Double> tempEMASignal = new ArrayList<>();
	private Double signalEMA;

	@Override
	public void update(MarketDataContainer marketDataContainer) {
		super.update(marketDataContainer);
		if(!this.isReady){
			try{
				//MACDIndicator is fast minus slow.
				this.value = getMACD(marketDataContainer);
				if(this.value != null){
					//Calculate the initial signal (Averaging)
					tempEMASignal.add(this.value);
					if(tempEMASignal.size() >= this.signalDays){
						tempEMASignal.stream().mapToDouble(a -> a).average().ifPresent(v->this.signalEMA = v);
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
			this.signalEMA = (this.value - this.signalEMA) * signalMultiplier + this.signalEMA;
		}
	}

	public Double getSignalEMA(){
		return this.signalEMA;
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
		res.put(this.getClass().getSimpleName() + "_SIGNAL", this.signalEMA);
		return res;
	}
}
