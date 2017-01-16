CREATE TABLE BASE_QUOTE (
	TIME_STAMP bigint NOT NULL  
    ,OPEN_QUOTE float NOT NULL  
    ,CLOSE_QUOTE float NOT NULL
    ,HIGH_QUOTE float NOT NULL
    ,LOW_QUOTE float NOT NULL
    ,VOLUME float NULL  
    ,PRODUCT float NOT NULL
    ,PRIMARY KEY (TIME_STAMP, PRODUCT)
)