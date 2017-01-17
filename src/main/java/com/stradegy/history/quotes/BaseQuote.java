package com.stradegy.history.quotes;

import com.stradegy.enums.Product;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by User on 10/1/2017.
 */
@Entity
@IdClass(BaseQuotePK.class)
@Table(name="BASE_QUOTE")
public class BaseQuote implements Serializable, Comparable<BaseQuote>{

	@Column(name="OPEN_QUOTE")
	protected Double open;
	@Column(name="HIGH_QUOTE")
	protected Double high;
	@Column(name="LOW_QUOTE")
	protected Double low;
	@Column(name="CLOSE_QUOTE")
	protected Double close;
	@Column(name="VOLUME")
	protected Double volume;
	@Id
	@Column(name="TIME_STAMP")
	protected Long timestamp;
	@Id
	@Column(name="PRODUCT")
	protected Product product;

	@Override
	public int compareTo(BaseQuote o) {
		Long res = this.timestamp - o.timestamp;
		if(res > 0L)
			return 1;
		if(res.equals(0L))
			return 0;
		else
			return -1;
	}

	public BaseQuote(Double open, Double high, Double low, Double close, Double volume, Long timestamp, Product product) {
		this.open = open;
		this.high = high;
		this.low = low;
		this.close = close;
		this.volume = volume;
		this.timestamp = timestamp;
		this.product = product;
	}

	public BaseQuote() {
	}

	public Double getOpen() {
		return open;
	}

	public Double getHigh() {
		return high;
	}

	public Double getLow() {
		return low;
	}

	public Double getClose() {
		return close;
	}

	public Double getVolume() {
		return volume;
	}

	public Long getTimestamp() {
		return timestamp;
	}

	@Enumerated(EnumType.STRING)
	public Product getProduct() {
		return product;
	}

	public void setOpen(Double open) {
		this.open = open;
	}

	public void setHigh(Double high) {
		this.high = high;
	}

	public void setLow(Double low) {
		this.low = low;
	}

	public void setClose(Double close) {
		this.close = close;
	}

	public void setVolume(Double volume) {
		this.volume = volume;
	}

	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}

	public void setProduct(Product product) {
		this.product = product;
	}
}
