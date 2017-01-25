package com.stradegy.utils;

import com.stradegy.ApplicationConstants;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by Iceberglet on 16/1/2017.
 */
public class Day {

	Date date;
	Calendar cal = Calendar.getInstance();

	public Day(Date date){
		this.date = date;
	}

	public Day(Long timestamp){
		this.date = new Date(timestamp);
	}

	public Day addDay(int numberOfDays){
		cal.setTime(date);
		cal.add(Calendar.DATE, numberOfDays); //minus number would decrement the days
		return new Day(cal.getTime());
	}

	public Long getStart(){
		return CommonUtils.getDateStart(this.date);
	}

	public Long getEnd(){
		return CommonUtils.getEndOfDay(this.date);
	}

	@Override
	public String toString(){
		return ApplicationConstants.DATE_FORMAT.format(this.date);
	}
}
