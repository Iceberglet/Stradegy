package com.stradegy.fileService;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;
import java.util.TreeMap;

/**
 * Created by User on 25/1/2017.
 */
public class CSVAssembler {

	Map<Long, Map<String, Object>> data;

	public CSVAssembler(){
		data = new TreeMap<>();
	}

	public void addRowRecord(RowRecord rowRecord){
		if(data.containsKey(rowRecord.getId())){
			data.get(rowRecord.getId()).putAll(rowRecord.toRowData());
		} else {
			data.put(rowRecord.getId(), rowRecord.toRowData());
		}
	}

	public void toFile(String path){
		try{
			PrintWriter writer = new PrintWriter("the-file-name.txt", "UTF-8");
			for(Map.Entry<Long, Map<String, Object>> row : data.entrySet()){
				String line = "" + row.getKey();
				
				writer.println(line);
			}
			writer.close();
		} catch (IOException e) {
			// do something
		}
	}
}
