package com.stradegy;

import com.stradegy.dao.HibernateDao;
import com.stradegy.enums.Product;
import com.stradegy.history.analyser.Evaluator;
import com.stradegy.history.quotes.BaseQuote;
import com.stradegy.openexchange.OpenXChangeInterpreter;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartPanel;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.renderer.xy.XYItemRenderer;
import org.jfree.data.time.TimeSeries;
import org.jfree.data.time.ohlc.OHLCSeries;
import org.jfree.data.xy.DefaultHighLowDataset;
import org.jfree.data.xy.XYSeriesCollection;
import org.jfree.ui.ApplicationFrame;
import org.jfree.ui.RefineryUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.awt.BorderLayout;
import java.awt.Color;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.swing.JPanel;

import org.jfree.chart.ChartPanel;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.DateAxis;
import org.jfree.chart.axis.NumberAxis;
import org.jfree.chart.labels.StandardXYToolTipGenerator;
import org.jfree.chart.plot.CombinedDomainXYPlot;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.plot.XYPlot;
import org.jfree.chart.renderer.xy.CandlestickRenderer;
import org.jfree.chart.renderer.xy.XYBarRenderer;
import org.jfree.data.time.FixedMillisecond;
import org.jfree.data.time.TimeSeries;
import org.jfree.data.time.TimeSeriesCollection;
import org.jfree.data.time.ohlc.OHLCSeries;
import org.jfree.data.time.ohlc.OHLCSeriesCollection;
/**
 * Created by User on 10/1/2017.
 */
public class AppStradegy{

	@Autowired
	OpenXChangeInterpreter openXChangeInterpreter;

	@Autowired
	HibernateDao hibernateDao;

	public void run(){

		Evaluator.evaluate(hibernateDao);



//		openXChangeInterpreter.getQuoteForDate(new Date(), CurrencyPair.EURUSD);
		//TickStoryParser tickStoryParser = new TickStoryParser();
		//tickStoryParser.setHibernateDao(hibernateDao);


//		ChartClass obj = new ChartClass("JFree Chart");
//
//		obj.pack();
//		RefineryUtilities.centerFrameOnScreen(obj);
//		obj.setVisible(true);


//		for(Product product : Product.values()){
//			//tickStoryParser.parseAndSaveProduct(product);
//
//			for(Long x = 1480006740000L; x < 1484236740000L; x+=100000L){
//				Collection<BaseQuote> baseQuotes = hibernateDao.query(x, x + 100000L, product);
//				System.out.println(baseQuotes.size());
//			}
//		}

		//hibernateDao.saveAll(quotes);
		//Collection<BaseQuote> res = hibernateDao.query(0L, Long.MAX_VALUE, Product.AUDUSD);
		//System.out.println("Got: " + res.size());
	}

	public static void main(String[] args){
		ApplicationContext context =
				new ClassPathXmlApplicationContext("applicationContext.xml");

		AppStradegy appStradegy = (AppStradegy) context.getBean("appStradegy");

		appStradegy.run();
	}
}
