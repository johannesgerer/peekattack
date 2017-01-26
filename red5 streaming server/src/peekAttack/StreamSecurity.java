package peekAttack;

import org.red5.server.api.IScope;
import org.red5.server.api.stream.*;

import org.apache.log4j.Logger;


public class StreamSecurity implements IStreamPlaybackSecurity, IStreamPublishSecurity{
	  //logger 
    private static  Logger      logger          =   Logger.getLogger(Application.class) ;
    
    
	@Override
	public boolean isPlaybackAllowed(IScope scope, String name, int start,
			int length, boolean flushPlaylist) {
		
		if(TokenValidator.usingHMAC_SHA1(name)){
			logger.error("not blocking play ("+name+")");
			return true;
		}else{
			logger.error("blocking play ("+name+")");
			return false;
		}
	}
	@Override
	public boolean isPublishAllowed(IScope scope, String name, String mode) {
			if(TokenValidator.usingHMAC_SHA1(name)){
				logger.error("not blocking publish ("+name+")");
				return true;
			}else{
				logger.error("blocking publish ("+name+")");
				return false;
			}
	}
	
}