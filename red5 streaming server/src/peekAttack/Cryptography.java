package peekAttack;

import java.security.*;

import javax.crypto.*;
import javax.crypto.spec.*;

import org.apache.log4j.Logger;


public class Cryptography {

    //logger 
    private static  Logger      logger          =   Logger.getLogger(Application.class) ;
    
  /**
  * Turns array of bytes into string
  *
  * @param buf       Array of bytes to convert to hex string
  * @return  Generated hex string
  */
  public static String byteArrayToHexString (byte buf[]) {
   StringBuffer strbuf = new StringBuffer(buf.length * 2);
   int i;

   for (i = 0; i < buf.length; i++) {
    if (((int) buf[i] & 0xff) < 0x10)
         strbuf.append("0");

    strbuf.append(Long.toString((int) buf[i] & 0xff, 16));
   }

   return strbuf.toString();
  }
  public static byte[] hexStringToByteArray(String s) {
	    int len = s.length();
	    byte[] data = new byte[len / 2];
	    for (int i = 0; i < len; i += 2) {
	        data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
	                             + Character.digit(s.charAt(i+1), 16));
	    }
	    return data;
	}


  public static String AES_encrypt(String input, String key) {

    // Generate the secret key specs.
     byte[] raw = key.getBytes();
    SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");


    // Instantiate the cipher
    Cipher cipher;
	try {
		cipher = Cipher.getInstance("AES");
	    cipher.init(Cipher.ENCRYPT_MODE, skeySpec);
	    byte[] encrypted = cipher.doFinal(input.getBytes());
	    return byteArrayToHexString(encrypted);
	} catch (NoSuchAlgorithmException e) {
	} catch (NoSuchPaddingException e) {
	} catch (InvalidKeyException e) {
	} catch (IllegalBlockSizeException e) {
	} catch (BadPaddingException e) {
	}

	return "";
    
  }
  
  public static String AES_decrypt(String input, String key) throws Exception {

	    // Generate the secret key specs.
	    //byte[] raw = key.getBytes();
	    byte[] raw = key.getBytes("UTF-8");
	    SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");

	    // Instantiate the cipher
	    Cipher cipher;
		cipher = Cipher.getInstance("AES");
	    cipher.init(Cipher.DECRYPT_MODE, skeySpec);
	    byte[] original = cipher.doFinal(hexStringToByteArray(input));
	    String originalString = new String(original);
	    return originalString;

	  }
  
  public static String HMAC_SHA1(String data, String key)
  throws  Exception
  {
	  	  // get an hmac_sha1 Mac instance and initialize with the signing key
		  Mac mac = Mac.getInstance("HmacSHA1");
		  mac.init(new SecretKeySpec(key.getBytes(), "HmacSHA1"));

		  // compute the hmac on input data bytes and convert
		  return byteArrayToHexString(mac.doFinal(data.getBytes()));
  }

}

