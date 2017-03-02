package com.thingword.powermonitor.db;

import java.util.List;

public class RecordStatusFile {
	private List<RecordStatus> data;
	private String name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<RecordStatus> getData() {
		return data;
	}
	public void setData(List<RecordStatus> data) {
		this.data = data;
	}
}
