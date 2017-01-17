package com.stradegy;

import com.stradegy.dao.HibernateDao;
import com.stradegy.enums.Product;
import com.stradegy.history.parser.TickStoryParser;
import com.stradegy.history.quotes.BaseQuote;
import com.stradegy.openexchange.OpenXChangeInterpreter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.Collection;
/**
 * Created by User on 10/1/2017.
 */
public class AppStradegy {

	@Autowired
	OpenXChangeInterpreter openXChangeInterpreter;

	@Autowired
	HibernateDao hibernateDao;

	public void run(){
//		openXChangeInterpreter.getQuoteForDate(new Date(), CurrencyPair.EURUSD);
		//TickStoryParser tickStoryParser = new TickStoryParser();
		//tickStoryParser.setHibernateDao(hibernateDao);

		for(Product product : Product.values()){
			//tickStoryParser.parseAndSaveProduct(product);

			for(Long x = 1480006740000L; x < 1484236740000L; x+=100000L){
				Collection<BaseQuote> baseQuotes = hibernateDao.query(x, x + 100000L, product);
				System.out.println(baseQuotes.size());
			}
		}

		//hibernateDao.saveAll(quotes);
		//Collection<BaseQuote> res = hibernateDao.query(0L, Long.MAX_VALUE, Product.AUDUSD);
		//System.out.println("Got: " + res.size());
	}




	public static void main(String[] args){
		ApplicationContext context =
				new ClassPathXmlApplicationContext("applicationContext.xml");

		AppStradegy obj = (AppStradegy) context.getBean("appStradegy");

		obj.run();
	}
}
