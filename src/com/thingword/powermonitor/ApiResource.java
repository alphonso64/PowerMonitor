package com.thingword.powermonitor;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.sql.Timestamp;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.hibernate.loader.custom.Return;
import org.hibernate.loader.plan.exec.process.spi.ReturnReader;
import org.hibernate.secure.internal.DisabledJaccServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;

import com.google.gson.Gson;
import com.thingword.powermonitor.db.DispatchFile;
import com.thingword.powermonitor.db.RecordStatusFile;
import com.thingword.powermonitor.db.ReqHistory;
import com.thingword.powermonitor.db.ReturnData;
import com.thingword.powermonitor.db.ReturnMessage;
import com.thingword.powermonitor.db.Status;
import com.thingword.powermonitor.service.StatusService;
import com.thingword.powermonitor.service.impl.StatusServiceImpl;
import com.thingword.powermonitor.util.FileUtil;

import javassist.ByteArrayClassPath;

@Path("/api")
public class ApiResource {	

	@Autowired
	private StatusServiceImpl statusServiceImpl;
	
	@POST
	@Path("/uploadStatus")	
	@Consumes(MediaType.APPLICATION_JSON)
	public void uploadStatus(Status status) {
		status.setTime( new Timestamp(System.currentTimeMillis()));
		statusServiceImpl.insert(status);
		Gson gson = new Gson();
		String msg = gson.toJson(status);
		//System.out.println(msg);
		for (WebSocketWorker item : WebSocketWorker.webSocketSet) {
			try {
				item.sendMessage(msg);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	
	@POST
	@Path("/getHistory")	
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ReturnData<Status> getHistory(ReqHistory his) {
		return statusServiceImpl.getHistory(his);
	}
	
	@POST
	@Path("/getFileContent")
	@Consumes(MediaType.APPLICATION_JSON)
	public String getFileContent(DispatchFile file) {
		//System.out.println("getFileContent");
		return statusServiceImpl.getFileContent(file.getPath());
	}
	
	@POST
	@Path("/delFile")
	@Consumes(MediaType.APPLICATION_JSON)
	public ReturnMessage delFile(DispatchFile file) {
		return statusServiceImpl.delFile(file.getPath());
	}
	
	
	@POST
	@Path("/getFileList")	
	@Produces(MediaType.APPLICATION_JSON)
	public ReturnData<DispatchFile> getHistory() {
		//System.out.println("getFileList");
		return statusServiceImpl.getFileList();
	}
	
	@POST
	@Path("/uploadFile")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public void uploadFile(@FormDataParam("file") InputStream uploadedInputStream,
			@FormDataParam("file") FormDataContentDisposition fileDetail) {
		statusServiceImpl.uploadFile(fileDetail.getFileName(), uploadedInputStream);
		//System.out.println(fileDetail.getFileName());
	}
		
	@POST
	@Path("/statusFile")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void statusFile(RecordStatusFile rf){
		statusServiceImpl.saveRecordFile(rf);
	}
	
	@GET
	@Path("/reqFile")
	public byte[] reqFile(@QueryParam("path") String path, @Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		//System.out.println(path);
		byte[] bytes = FileUtil.getFile(path);
		response.addHeader("Content-Length", String.valueOf(bytes.length));
		return bytes;
	}
	


		
	
}