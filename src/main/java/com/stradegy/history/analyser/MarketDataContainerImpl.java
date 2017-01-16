package com.stradegy.history.analyser;

import com.stradegy.dao.HibernateDao;
import com.stradegy.utils.Day;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;

/**
 * Created by Iceberglet on 16/1/2017.
 */
@Service("MarketDataContainer")
public class MarketDataContainerImpl {

	@Autowired
	HibernateDao hibernateDao;

	public static final int cachedDays = 50;

	HashMap<Day, MarketData> marketDataHashMap;

	public MarketData get(Day date){
		//If not found, query for another 50 days

		//And keep the size of list to be 200
		return null;
	}

	private void advanceDays(int days){ 
	}



}
