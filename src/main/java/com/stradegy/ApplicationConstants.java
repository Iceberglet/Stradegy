package com.stradegy;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;

/**
 * Created by User on 10/1/2017.
 */
public class ApplicationConstants {
	public static final SimpleDateFormat FORMAT_DATE = new SimpleDateFormat("YYYY-MM-DD");

	public static final String API_HISTORY_PREFIX = "https://openexchangerates.org/api/historical/";
	public static final String API_POSTFIX = "?app_id=44fb511d7a414e8486c7a2dd689ce547";

	public static final String DUKASCOPY_PATH = "C:/Users/User/AppData/Roaming/Tickstory/Tickstory Lite/Data/";
	public static final NumberFormat FORMAT_INDICATOR = new DecimalFormat("#0.0000");
	public static final NumberFormat FORMAT_NOTIONAL = new DecimalFormat("#0.00");
	public static final NumberFormat FORMAT_PRICE = new DecimalFormat("#0.0000");
}
