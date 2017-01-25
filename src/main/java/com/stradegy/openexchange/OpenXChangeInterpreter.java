package com.stradegy.openexchange;

import com.stradegy.ApplicationConstants;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.io.*;
import java.net.*;

/**
 * Created by User on 10/1/2017.
 */
@Service("OpenXChangeInterpreter")
public class OpenXChangeInterpreter {

	public String composeHistoryRequest(Date date){
		StringBuffer stringBuffer = new StringBuffer(ApplicationConstants.API_HISTORY_PREFIX);
		stringBuffer.append(ApplicationConstants.FORMAT_DATE.format(date));
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



}
