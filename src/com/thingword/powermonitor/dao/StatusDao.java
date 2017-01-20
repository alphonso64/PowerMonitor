package com.thingword.powermonitor.dao;

import java.util.List;

import com.thingword.powermonitor.db.ReturnData;
import com.thingword.powermonitor.db.Status;

public interface StatusDao {
	public boolean insert(Status status);
	public List<Status> getStatus(String start,String end); 

}
