package com.thingword.powermonitor.db;

import java.sql.Timestamp;

public class Status {
	private int ID;
	private Timestamp time;
    private String temp_a;
    private String temp_b;
    private String ua;
    private String ia;
    private String power;
    private String errorcode;
    private String powerlevel;
	public String getTemp_a() {
		return temp_a;
	}
	public void setTemp_a(String temp_a) {
		this.temp_a = temp_a;
	}
	public String getTemp_b() {
		return temp_b;
	}
	public void setTemp_b(String temp_b) {
		this.temp_b = temp_b;
	}
	public String getUa() {
		return ua;
	}
	public void setUa(String ua) {
		this.ua = ua;
	}
	public String getIa() {
		return ia;
	}
	public void setIa(String ia) {
		this.ia = ia;
	}
	public String getPower() {
		return power;
	}
	public void setPower(String power) {
		this.power = power;
	}
	public String getErrorcode() {
		return errorcode;
	}
	public void setErrorcode(String errorcode) {
		this.errorcode = errorcode;
	}

	public String getPowerlevel() {
		return powerlevel;
	}
	public void setPowerlevel(String powerlevel) {
		this.powerlevel = powerlevel;
	} 
	
	public void printfInfo(){
		System.out.println("temp_a:"+temp_a+" "+"temp_b:"+temp_b+" "+"ua:"+ua
				+" "+"ia:"+ia+" "+"power:"+power+" "+"errorcode:"+errorcode+" "+"powerlevel"+powerlevel);
	}
	public Timestamp getTime() {
		return time;
	}
	public void setTime(Timestamp time) {
		this.time = time;
	}
	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	
}
