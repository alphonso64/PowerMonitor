package com.thingword.powermonitor.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.thingword.powermonitor.dao.impl.StatusDaoImpl;
import com.thingword.powermonitor.db.DispatchFile;
import com.thingword.powermonitor.db.MESSAGE;
import com.thingword.powermonitor.db.ReqHistory;
import com.thingword.powermonitor.db.ReturnData;
import com.thingword.powermonitor.db.Status;
import com.thingword.powermonitor.service.StatusService;
import com.thingword.powermonitor.util.FileUtil;

public class StatusServiceImpl implements StatusService{
	
	private static final String filePath = "D:\\upload\\file\\";
	
	@Autowired
	StatusDaoImpl statusDaoImpl;

	@Override
	public boolean insert(Status status) {
		return statusDaoImpl.insert(status);
	}

	@Override
	public ReturnData<Status> getHistory(ReqHistory reqHistory) {
		ReturnData<Status> returnData =  new ReturnData<>();
		returnData.setReturn_code(MESSAGE.RETURN_FAIL);
		returnData.setReturn_msg(MESSAGE.QUERY_HIS_FAIL);
		List<Status> ls = statusDaoImpl.getStatus(reqHistory.getStart(), reqHistory.getEnd());
		if(ls.size()!=0){
			returnData.setReturn_code(MESSAGE.RETURN_SUCCESS);
			returnData.setReturn_msg(MESSAGE.RETURN_FAIL);
			returnData.setData(ls);
		}
		return returnData;
	}
	
	@Override
	public ReturnData<DispatchFile> getFileList() {
		ReturnData<DispatchFile> returnData = new ReturnData();
		List<DispatchFile> dispatchFiles = FileUtil.getFileList(filePath);
		returnData.setData(dispatchFiles);
		returnData.setReturn_code(MESSAGE.RETURN_SUCCESS);
		return returnData;
	}

	@Override
	public void uploadFile(String name, InputStream inputStream) {
		try {
			FileUtil.saveToFile(filePath+name,inputStream);
		} catch (IOException e) {
			
		}		
	}

}
