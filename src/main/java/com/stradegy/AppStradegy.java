package com.stradegy;

import com.stradegy.enums.Product;
import com.stradegy.history.parser.TickStoryParser;
import com.stradegy.openexchange.OpenXChangeInterpreter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.Arrays;
import java.util.stream.*;
/**
 * Created by User on 10/1/2017.
 */
public class AppStradegy {

	@Autowired
	OpenXChangeInterpreter openXChangeInterpreter;

	public void run(){
//		openXChangeInterpreter.getQuoteForDate(new Date(), CurrencyPair.EURUSD);
		//Arrays.asList(Product.values()).stream().forEach(v -> TickStoryParser.parseProduct(v));
		TickStoryParser.scanFile("D:/MIN_EXPERIMENTS/AUDUSD.csv", Product.AUDUSD);
	}




	public static void main(String[] args){
		ApplicationContext context =
				new ClassPathXmlApplicationContext("applicationContext.xml");

		AppStradegy obj = (AppStradegy) context.getBean("appStradegy");

		obj.run();
	}
}
