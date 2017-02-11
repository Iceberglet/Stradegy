package com.stradegy.fileService;

import com.stradegy.utils.Day;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;
import java.util.stream.Collectors;

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
		List<String> knownColumns = new ArrayList<>();
		List<String> lines = new ArrayList<>();
		try{
			List<Object> toLine = new ArrayList<>();
			for(Map.Entry<Long, Map<String, Object>> row : data.entrySet()){
//				toLine.add(row.getKey());


				for(Map.Entry<String, Object> cell : row.getValue().entrySet()){
					int idx = knownColumns.indexOf(cell.getKey());
					//If new key, add to knownColumns
					if(idx < 0){
						knownColumns.add(cell.getKey());
						idx = knownColumns.size() - 1;
					}
					//Buffer the new line, to add the cell
					while(toLine.size() <= idx)
						toLine.add(null);
					//Set the value
					toLine.set(idx, cell.getValue());
				}
//				writer.println(toLine.stream().reduce("", (a, b) -> a.toString() + "," + b.toString()));
				lines.add(
						(new Day(row.getKey())).toString() + "," +
						toLine.stream().map(a->a.toString()).collect(Collectors.joining(", "))
				);
			}


			PrintWriter writer = new PrintWriter(path, "UTF-8");
			writer.println("," + knownColumns.stream().map(a->a.toString()).collect(Collectors.joining(", ")));
			for(String l : lines){
				writer.println(l);
			}
			writer.close();
		} catch (IOException e) {
			// do something
		}
	}

	public void toJSFile(String path, String objName){
		List<String> knownColumns = Arrays.asList("OPEN", "HIGH", "LOW", "CLOSE");
		List<String> lines = new ArrayList<>();
		try{
			List<Object> toLine = new ArrayList<>();
			for(Map.Entry<Long, Map<String, Object>> row : data.entrySet()){
//				toLine.add(row.getKey());


				for(Map.Entry<String, Object> cell : row.getValue().entrySet()){
					int idx = knownColumns.indexOf(cell.getKey());
					//If new key, add to knownColumns
					if(idx < 0){
						knownColumns.add(cell.getKey());
						idx = knownColumns.size() - 1;
					}
					//Buffer the new line, to add the cell
					while(toLine.size() <= idx)
						toLine.add(null);
					//Set the value
					toLine.set(idx, cell.getValue());
				}
				lines.add(
						"[" + new Day(row.getKey()).getEnd() + "," +
								toLine.stream().map(a->a.toString()).collect(Collectors.joining(", "))
								+ "]"
				);
			}
			//remove the last comma
//			String lastLine = lines.get(lines.size() - 1).substring(0, lines.size() - 1);
//			lines.remove(lines.size() - 1);
//			lines.add(lastLine);

			PrintWriter writer = new PrintWriter(path, "UTF-8");
			writer.println("export const "+ objName + " = [");
			for(int i = 0; i < lines.size() - 1; i++){
				writer.println(lines.get(i) + ",");
			}
			writer.println(lines.get(lines.size() - 1));
			writer.println("]");
			writer.close();
		} catch (IOException e) {
			// do something
		}
	}
}
