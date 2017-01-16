package com.stradegy.history.parser;

import com.stradegy.dao.HibernateDao;
import com.stradegy.enums.Product;
import com.stradegy.history.quotes.BaseQuote;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;

/**
 * Created by User on 13/1/2017.
 */
public class TickStoryParser {

	HibernateDao hibernateDao;

	static final String PATH_DATA = "D:/MIN_EXPERIMENTS/XMLData/";
	static final DateFormat DATETIME_FORMAT = new SimpleDateFormat("yyyyMMdd HH:mm:ss");
	static final int cacheSize = 10000;

	public void setHibernateDao(HibernateDao hibernateDao){
		this.hibernateDao = hibernateDao;
	}

	public void parseAndSaveProduct(Product product){
		String productPath = PATH_DATA + product.name() + ".csv";
		if(new File(productPath).exists()) {
			System.out.println("Starting to parse: " + product.name());
			scanAndSaveFile(productPath, product);
		}
		else {
			System.out.println("Error. File Not Found: " + productPath);
		}
	}

	//Parse and save into database
	public void scanAndSaveFile(String path, Product product){
		BufferedReader br = null;
		String line = "";
		String cvsSplitBy = ",";
		Collection<BaseQuote> res = new ArrayList<>();

		try {
			br = new BufferedReader(new FileReader(path));
			line = br.readLine();	//skip first line
			while ((line = br.readLine()) != null) {

				// use comma as separator
				String[] lineData = line.split(cvsSplitBy);
				String dateString = lineData[0] + " " + lineData[1];
				Date date = DATETIME_FORMAT.parse(dateString);
				Double open = Double.parseDouble(lineData[2]);
				Double high = Double.parseDouble(lineData[3]);
				Double low = Double.parseDouble(lineData[4]);
				Double close = Double.parseDouble(lineData[5]);
				Double volume = Double.parseDouble(lineData[6]);

//				System.out.println(date.getTime() + "," + open + "," + high + "," + low + "," + close + "," + volume);
				BaseQuote newQuote = new BaseQuote(open, high, low, close, volume, date.getTime(), product);
				res.add(newQuote);

				if(res.size() > cacheSize) {
					hibernateDao.saveAll(res);
					res = new ArrayList<>();
					System.out.println("Parsed another " + cacheSize);
				}
			}
		} catch (FileNotFoundException e) {
			System.out.println("Skipping: " + path);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		hibernateDao.saveAll(res);
		//return res;
	}
}
