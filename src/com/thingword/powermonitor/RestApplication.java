package com.thingword.powermonitor;
import org.codehaus.jackson.jaxrs.JacksonJsonProvider;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;

public class RestApplication extends ResourceConfig {
	public RestApplication() {
		System.out.println("test");
		packages("com.thingword.powermonitor");
		register(MultiPartFeature.class);
		register(JacksonJsonProvider.class);	
	}
}