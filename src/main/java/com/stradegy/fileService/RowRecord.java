package com.stradegy.fileService;


import java.util.TreeMap;

/**
 * Created by User on 25/1/2017.
 */
public interface RowRecord {

	Long getId();

	TreeMap<String, Object> toRowData();
}
