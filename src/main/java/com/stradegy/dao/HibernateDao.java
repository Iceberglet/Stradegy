package com.stradegy.dao;

import com.stradegy.enums.Product;
import com.stradegy.history.quotes.BaseQuote;

import java.util.Collection;

/**
 * Created by User on 13/1/2017.
 */
public interface HibernateDao {

	BaseQuote save(BaseQuote baseQuote);

	Collection<BaseQuote> saveAll(Collection<BaseQuote> baseQuotes);

	BaseQuote query(Long timestamp, Product product);

	Collection<BaseQuote> query(Long timeStart, Long timeEnd, Product product);

}
