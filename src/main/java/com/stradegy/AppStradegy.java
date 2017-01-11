package com.stradegy;

import com.stradegy.enums.CurrencyPair;
import com.stradegy.openexchange.OpenXChangeInterpreter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.Date;

/**
 * Created by User on 10/1/2017.
 */
public class AppStradegy {

	@Autowired
	OpenXChangeInterpreter openXChangeInterpreter;

	public void run(){
		openXChangeInterpreter.getQuoteForDate(new Date(), CurrencyPair.EURUSD);
	}

	public static void main(String[] args){
		ApplicationContext context =
				new ClassPathXmlApplicationContext("applicationContext.xml");

		AppStradegy obj = (AppStradegy) context.getBean("appStradegy");

		obj.run();
	}
}
