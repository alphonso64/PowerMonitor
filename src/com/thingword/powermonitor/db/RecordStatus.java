package com.thingword.powermonitor.db;

public class RecordStatus {
	private String  ac_content;
	private String  ac_info;
	private int  ac_sta;
	private int  action;
	private int  level;
	private int  power;
	private int  temp;
	public String getAc_content() {
		return ac_content;
	}
	public void setAc_content(String ac_content) {
		this.ac_content = ac_content;
	}
	public String getAc_info() {
		return ac_info;
	}
	public void setAc_info(String ac_info) {
		this.ac_info = ac_info;
	}
	public int getAc_sta() {
		return ac_sta;
	}
	public void setAc_sta(int ac_sta) {
		this.ac_sta = ac_sta;
	}
	public int getAction() {
		return action;
	}
	public void setAction(int action) {
		this.action = action;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public int getPower() {
		return power;
	}
	public void setPower(int power) {
		this.power = power;
	}
	public int getTemp() {
		return temp;
	}
	public void setTemp(int temp) {
		this.temp = temp;
	}	
}
