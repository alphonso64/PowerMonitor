package com.thingword.powermonitor.service;

import java.io.InputStream;

import com.thingword.powermonitor.db.DispatchFile;
import com.thingword.powermonitor.db.ReqHistory;
import com.thingword.powermonitor.db.ReturnData;
import com.thingword.powermonitor.db.Status;

public interface StatusService {
	public boolean insert(Status status);
	public ReturnData<Status> getHistory(ReqHistory reqHistory);
	public ReturnData<DispatchFile> getFileList();
	public void uploadFile(String name, InputStream inputStream);
}