package com.stradegy.fileService;

import java.util.Map;

/**
 * Created by User on 25/1/2017.
 */
public interface RowRecord {

	Long getId();

	Map<String, Object> toRowData();
}
