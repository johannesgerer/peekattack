package peekAttack;

import org.red5.server.api.IScope;
import org.red5.server.api.IConnection;

import org.apache.log4j.Logger;
import org.red5.server.adapter.MultiThreadedApplicationAdapter;

// dIScheduledJob implementation is needed for timing
public class Application extends MultiThreadedApplicationAdapter {

    //logger 
    private static  Logger      logger          =   Logger.getLogger(Application.class) ;

    //THESE PROPERTY ARE SET BY BEANS IN red5-web.xml !!!!!!!!!!!   YIPIEH
    //http://www.xmlmind.com/xmleditor/_distrib/doc/gui/bean_properties.html
    //http://www.red5.org/wiki/Documentation/UsersReferenceManual/Red5CoreTechnologies/03-Customize-Stream-Paths
    public void setTokenDelimiter		(String param)	{ TokenValidator.tokenDelimiter = param; }
    public void setTokenKey    	 		(String param)	{ TokenValidator.tokenKey = param; }
    public void setTokenTimeLimitMillis	(String param)	{ TokenValidator.tokenTimeLimitMillis = Long.parseLong(param); }
    
    
        @Override
    public boolean appStart(IScope scope) {
        	
        	
        Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
          
            public void run() {
                appStop(null);
            }
        }));
       
        registerStreamPublishSecurity(new StreamSecurity()); 
        logger.error("appStart");

        return true;

    }

    @Override
    public void appStop(IScope scope) {
    	
        //info
        logger.error("appStop");
 
    }
    
    // Called when the clients connect
    @Override
    public synchronized boolean connect(IConnection conn, IScope scope, Object[] params) {
    	
    	String AccessToken = params[0].toString();
    	logger.error("connect");
        
    	//super.disconnect(conn, scope);
    	String ip = conn.getRemoteAddress();

        if(TokenValidator.usingHMAC_SHA1(AccessToken) &&
        		super.connect(conn, scope, params))
        {
    			logger.error("Client connected, client IP: " + ip);
        		return true;
        }else{
			logger.error("Client blocked, client IP: " + ip);
        	return true;//TODO
        }
    }

    @Override
    public synchronized void disconnect(IConnection conn, IScope scope) {
    	logger.error("disconnect");
    }

}



