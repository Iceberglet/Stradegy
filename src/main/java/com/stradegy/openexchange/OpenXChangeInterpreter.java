package com.stradegy.openexchange;

import com.google.gson.GsonBuilder;
import com.stradegy.ApplicationConstants;
import com.stradegy.enums.Currency;
import com.stradegy.enums.CurrencyPair;
import com.stradegy.quotes.FxQuote;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.io.*;
import java.net.*;

/**
 * Created by User on 10/1/2017.
 */
@Service("OpenXChangeInterpreter")
public class OpenXChangeInterpreter {

	private Map<String, Set<FxQuote>> obtainedQuotes = new HashMap<String, Set<FxQuote>>();

	public String composeHistoryRequest(Date date){
		StringBuffer stringBuffer = new StringBuffer(ApplicationConstants.API_HISTORY_PREFIX);
		stringBuffer.append(ApplicationConstants.DATE_FORMAT.format(date));
		stringBuffer.append(".json");
		stringBuffer.append(ApplicationConstants.API_POSTFIX);
		return stringBuffer.toString();
	}

	public String fetchQueryResult(String query) throws IOException {
		StringBuilder result = new StringBuilder();
		URL url = new URL(query);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String line;
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}
		rd.close();
		return result.toString();
	}

	public FxQuote getQuoteForDate(Date date, CurrencyPair currencyPair){
		Currency target = currencyPair.getNonUSDCurrency();
		try{
			String result = fetchQueryResult(composeHistoryRequest(date));



			//System.out.println(result);
		} catch (IOException e){
			e.printStackTrace();
		}
		return null;
	}


}
