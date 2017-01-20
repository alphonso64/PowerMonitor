package com.thingword.powermonitor.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.apache.pdfbox.multipdf.Splitter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.eclipse.jdt.internal.compiler.util.Sorting;

import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.ComThread;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;
import com.thingword.powermonitor.db.DispatchFile;

public class FileUtil {
	
	public static byte[] getFile(String path) {
		FileInputStream fis = null;
		byte[] bytes = new byte[0];
		if (path == null)
			return bytes;
		try {
			File file = new File(path);
			fis = new FileInputStream(file);
			bytes = new byte[fis.available()];
			fis.read(bytes);
			fis.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return bytes;
	}

	public static void deleteAllFilesOfDir(File path) {
		if (!path.exists())
			return;
		if (path.isFile()) {
			path.delete();
			return;
		}
		File[] files = path.listFiles();
		for (int i = 0; i < files.length; i++) {
			deleteAllFilesOfDir(files[i]);
		}
		// path.delete();
	}
	
	public static List<DispatchFile> getFileList(String parent) {
		List<DispatchFile> ls = new ArrayList<>();
		File root = new File(parent);
		File[] files = root.listFiles();
		for (File file : files) {
			if (file.isFile()) {
				DispatchFile dispatchFile = new DispatchFile();
				dispatchFile.setName(file.getName());
				dispatchFile.setPath(file.getAbsolutePath());
				ls.add(dispatchFile);
			}
		}
		return ls;
	}

	public static void saveToFile(String fileName, InputStream in) throws IOException {   
		File file = new File(fileName);
		if(file.exists())
			file.delete();
        FileOutputStream fos = null;      
        BufferedInputStream bis = null;      
        int BUFFER_SIZE = 1024;   
        byte[] buf = new byte[BUFFER_SIZE];      
        int size = 0;      
        bis = new BufferedInputStream(in);      
        fos = new FileOutputStream(fileName);     
        while ( (size = bis.read(buf)) != -1)       
          fos.write(buf, 0, size);                    
        fos.close();      
        bis.close();      
      }  
}
