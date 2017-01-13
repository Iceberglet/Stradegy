package com.stradegy.history.parser;

import com.stradegy.enums.Product;
import com.stradegy.history.quotes.BaseQuote;

import java.io.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by User on 13/1/2017.
 */
public class TickStoryParser {

	static final String PATH_DATA = "D:/MIN_EXPERIMENTS/Data/";
	static final DateFormat DATETIME_FORMAT = new SimpleDateFormat("YYYYMMDD:HH:MM:SS");

	public static void parseProduct(Product product){
		String productPath = PATH_DATA + product.name() + "/";
		if(new File(productPath).exists())
			System.out.println("Starting to parse: " + product.name());
		else {
			System.out.println("Error");
		}
	}

	//Parse and save into database
	public static void scanFile(String path, Product product){
		BufferedReader br = null;
		String line = "";
		String cvsSplitBy = ",";

		try {
			br = new BufferedReader(new FileReader(path));
			line = br.readLine();	//skip first line
			while ((line = br.readLine()) != null) {

				// use comma as separator
				String[] lineData = line.split(cvsSplitBy);
				Date date = DATETIME_FORMAT.parse(lineData[0] + ":" + lineData[1]);
				Double open = Double.parseDouble(lineData[2]);
				Double high = Double.parseDouble(lineData[3]);
				Double low = Double.parseDouble(lineData[4]);
				Double close = Double.parseDouble(lineData[5]);
				Double volume = Double.parseDouble(lineData[6]);

				System.out.println(date + "," + open + "," + high + "," + low + "," + close + "," + volume);
				BaseQuote newQuote = new BaseQuote(open, high, low, close, volume, date.getTime(), product);
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
	}
}
