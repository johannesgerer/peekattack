package peekAttack;


import org.apache.log4j.Logger;

public class TokenValidator {

    //logger 
    private static  Logger      logger          =   Logger.getLogger(Application.class) ;
    
	public static String 	tokenKey;
	public static String 	tokenDelimiter;
	public static long 		tokenTimeLimitMillis;
	
	public static boolean usingAES(String hexString){
		try {
			String decrypted = Cryptography.AES_decrypt(hexString, tokenKey);
			long currentTimestamp = System.currentTimeMillis();
			long tokenTimestamp = Long.parseLong(decrypted.split(tokenDelimiter, 2)[0]);
			logger.error(currentTimestamp-tokenTimestamp);
			if(currentTimestamp-tokenTimestamp<=tokenTimeLimitMillis){
				return true;
			}else{
				return false;
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error("decrypt exception: "+e.toString());
			return false;
		}
	}

	public static boolean usingHMAC_SHA1(String hexString){
		//hexString=   timestsamp+":"+HMAC_SHA1(timestamp,tokenKey)+":"+some String
		try {			
		//Aufsplitten in timestamp und hash
		String[] hexStringSplit=hexString.split(tokenDelimiter, 3);
		
		//Wenn der übergebene hash gleich dem HMAC_SHA1 unter 
		//nutzung des Keys tokenKey ist, dann ist der timestamp gültig
		
			if(hexStringSplit[1].equals(
					Cryptography.HMAC_SHA1(hexStringSplit[0], tokenKey)))
			{
				long currentTimestamp = System.currentTimeMillis();
				long tokenTimestamp = Long.parseLong(hexStringSplit[0]);
				
				if(currentTimestamp-tokenTimestamp<=tokenTimeLimitMillis)
					return true;
				else
				{
					logger.error("Token Expired: "+hexString);
					return false;
				}
				
			}else
			{
				logger.error("Token/Hash mismatch "+hexString);
				return false;
			}
		} catch (Exception e) {
			logger.error("Exception at Token Validation:"+hexString+" ("+e.getMessage()+")");
			return false;
		}
		
		
		
		
	}
	
}
