package peekAttack;
  
 
import java.sql.ResultSet;
import java.sql.Statement; 
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Collection;
import java.util.HashMap;

import org.apache.log4j.Logger;

import org.red5.server.api.IClient;
import org.red5.server.api.service.IPendingServiceCall;
import org.red5.server.api.service.IServiceCapableConnection;
import org.red5.server.api.Red5;
import org.red5.server.api.service.IPendingServiceCallback;



class User {


    static final public String ON_NOT_AVAILABLE             = "onNotAvailable"           ;
    static final public String ON_CALL_INVITATION           = "onCallInvitation"         ;
    static final public String ON_PARTNER_FROM_OTHER_SERVER = "onPartnerFromOtherServer" ;

    static final public String SQL_SEXUAL_MAX       =   "4";

    static final public String SQL_F_ID             =   "fID"       ;
    static final public String SQL_F_USER_ID        =   "fUserID"       ;
    static final public String SQL_F_CONNECTION_ID  =   "fConnectionID"       ;
    static final public String SQL_F_RED5CLIENT_ID  =   "fRed5ClientID" ;
    static final public String SQL_F_FACEBOOK_ID    =   "fFacebookID"   ;
    static final public String SQL_F_STRATUS_ID     =   "fStratusID"    ;
    static final public String SQL_F_AVAILABLE      =   "fAvailable"    ;
    static final public String SQL_F_UDP_ENABLED    =   "fUDPEnabled"   ;
    static final public String SQL_F_SERVER_URL     =   "fServerURL"    ;
    
    static final public String SQL_T_CREATED        =   "tCreated"      ;
    static final public String SQL_T_LAST_CALL      =   "tLastCall"     ;

    static final public String SQL_P_CAMERA_FILTER  =   "pCameraFilter" ;
    static final public String SQL_P_CAMERA         =   "pCamera"       ;
    static final public String SQL_P_GENDER_FILTER  =   "pGenderFilter" ;
    static final public String SQL_P_GENDER         =   "pGender"       ;
    static final public String SQL_P_SEXUAL_FILTER  =   "pSexualFilter" ;
    static final public String SQL_P_SEXUAL         =   "pSexual"       ;
    static final public String SQL_P_COUNTRY_FILTER =   "pCountryFilter";
    static final public String SQL_P_COUNTRY        =   "pCountry"      ;
    static final public String SQL_P_LANGUAGE_FILTER=   "pLanguageFilter";
    static final public String SQL_P_LANGUAGE       =   "pLanguage"      ;

  
    public String   fConnectionID="";           // primary key aus MySQL-DB (auto_increment)
    public String   fUserID         ;           // primary key aus MySQL-DB (auto_increment)
    public String   fRed5ClientID   ;
    public String   fPartnerClientID;           // To be able the partner in case of a disconnect
    public String   fPartnerUserID="";           // To be able the partner in case of a disconnect
    public String   fStratusID      ;
    public String   fFacebookID     ;
    public int      fUDPEnabled         ;
    
    public String   pCountryFilter      ;
    public String   pLanguageFilter     ;
    public int      pCamera             ;
    public int      pCameraFilter       ;
    public int      pGenderFilter       ;
    public int      pSexualFilter       ;


    public IClient  fClient          ;

    static public String   serverURL            ;
    
    //database
    public static     String      dbConnectionTable     ;
    public static     String      dbUsersTable          ;
    static public     Connection  mySQLConn             ;

    //User Array
    static public  HashMap<String,User>     users = new HashMap<String,User>();

     //Logger
    static private        Logger      logger      =   Logger.getLogger(Application.class);

    public User(IClient client, Object[] params)
    {
         fClient         =   client;
         fRed5ClientID   =   client.getId();
         fFacebookID     =   params[0].toString();
         fStratusID      =   params[1].toString();
         serverURL       =   params[2].toString();
         fUserID         =   params[3].toString();
         fUDPEnabled     =   (Integer)params[4];
         logger.error("udpenabled: "+Integer.toString(fUDPEnabled));
    }

    public static boolean userIDexists(String userID) throws SQLException
    {
    	 String selectString = "SELECT 0 FROM " + dbUsersTable + " WHERE "+ SQL_F_ID+"='"+userID+"'";
    	 
    	 Statement statement = mySQLConn.createStatement();//TODO muss man das jedes mal erzeugen?
    	 ResultSet selectResultSet = statement.executeQuery(selectString);
         
         return selectResultSet.next();
    }
    
    public boolean mySQLInsert() throws SQLException
    {
            Statement   statement   =   mySQLConn.createStatement();
            String      insertString;

            insertString = "INSERT INTO " + dbConnectionTable+" SET "+
                SQL_F_STRATUS_ID    +"='"+ addSlashes(fStratusID)   +"',"+
                SQL_F_SERVER_URL    +"='"+ addSlashes(serverURL)    +"',"+
                SQL_F_USER_ID       +"='"+ addSlashes(fUserID)      +"',"+
                SQL_F_RED5CLIENT_ID +"='"+ fRed5ClientID            +"',"+
                SQL_F_UDP_ENABLED   +"='"+ Integer.toString(fUDPEnabled)  +"'";
                
               //info
                logger.error("Inserting/updating User, stratusId: " + fStratusID+", facebookID: "+fFacebookID);

            statement.execute(insertString,Statement.RETURN_GENERATED_KEYS);
            ResultSet generatedKeysResult = statement.getGeneratedKeys();

            if (generatedKeysResult.next()) {
                fConnectionID = Integer.toString(generatedKeysResult.getInt(1));
                logger.error("Insert/update complete");
                 return true;
            } else {
                logger.error("Couldn't get generated Key");
                return false;  
            }
    }

   static public User getThisUser()
    {
        return users.get(Red5.getConnectionLocal().getClient().getId());
   }

   static public User get(String clientID)
    {
        return users.get(clientID);
    }

   static public void DeleteThisUser()
   {
       String clientID=Red5.getConnectionLocal().getClient().getId();
       logger.error("Deleteing "+clientID);
       User user=users.remove(clientID);
       if(user==null)
           logger.error("Removed user was null");
       else
        user.finalize();
   }
   
    @Override
   protected void finalize(){
        logger.error("Finalizing");

        if(!fConnectionID.equals(""))
        {
            User partner=get(fPartnerClientID);

            if(partner!=null)
            { 
                logger.error("Partner of removed user not null");
                partner.invoke(User.ON_NOT_AVAILABLE,new Object[]{fStratusID});
            }else
                logger.error("Partner of removed user null");

            //info
            logger.error("Client    disconnected, stratusID: " + fStratusID);

            mySQLDeleteBzwUpdate(fConnectionID);
        }
        
        try {
            super.finalize();
        } catch (Throwable e) {
            logger.error("Unable to finalize stratusID: " + fStratusID + "; "+e.getMessage());
        }
    }

    public void InitiateFindPartner(int fUDPEnabled, int pCamera, int pCameraFilter, int pGenderFilter,
                                    int pSexualFilter, String pCountryFilter, String pLanguageFilter)
    {
        this.pCountryFilter             = addSlashes(pCountryFilter);
        this.pLanguageFilter            = addSlashes(pLanguageFilter);
        this.pSexualFilter              = pSexualFilter;
        this.pGenderFilter              = pGenderFilter;
        this.pCamera                    = pCamera;
        this.pCameraFilter              = pCameraFilter;
        this.fUDPEnabled                = fUDPEnabled;

        FindPartner();
    }

     public boolean  partnerForImmideateConnection(String partnerClientID)
            //partnerDbId, This is used, if the partner has to be deleted from database
    {
         User partner        =   get(partnerClientID);

        if(partner==null)
        {
            logger.error("Dead partner found, deleteing from database");
            return false;

        }else{
            fPartnerClientID = partnerClientID;
            fPartnerUserID   = partner.fUserID;
            partner.fPartnerClientID = fRed5ClientID;
            partner.fPartnerUserID   = fUserID;
            
            setUserAndPartnerNotAvailable(partner);

            invokeOnCallInvitation(partner);
            partner.invokeOnCallInvitation(this);


           logger.error("Partner found: ConnectoinID: " + partner.fConnectionID + ", stratusId: " + partner.fStratusID);

           return true;
        }
    }

    // sets BOTH PARTNER AND THIS USER to not Available
    public void setUserAndPartnerNotAvailable(User partner){

        String updateString = "UPDATE "+dbConnectionTable+" SET "
            + SQL_F_AVAILABLE       + "=   0 "
            + "WHERE "+SQL_F_ID+"=" + partner.fConnectionID;


        logger.error(updateString);

        try {

            Statement statement = mySQLConn.createStatement();
            statement.executeUpdate(updateString);

            logger.error("Users updated");

            setUserAvailability("0");
            
        } catch (SQLException exception) {

            logger.error("SQLException at setUserAndPartnerNotAvailable: " + exception.getMessage());

        }

    }

    public void setPaused() {

       
        String updateString = "UPDATE "+dbConnectionTable+" SET "
                        + SQL_F_AVAILABLE+"       = 0 "
                        + "WHERE "+SQL_F_ID+"=" + fConnectionID;

        try {

            Statement statement = mySQLConn.createStatement();
            statement.executeUpdate(updateString);

            //info
            logger.error("User " + dbConnectionTable + " set to paused: " + updateString);

        } catch (SQLException exception) {

            logger.error("SQLException at setPaused: " + exception.getMessage());

        }

        if(fPartnerClientID!=null && fPartnerClientID.equals(""))
            onNotAvailable(fPartnerClientID,fStratusID);
    }

    private void FindPartner()
    {
    	//#####################################  ERSTEN SELECT MIT IN DEN ZWEITEN INTEGRIEREN!
    	
        //Get current propterties from tUsers
        String pCountry, pLanguage;
        int     pSexual, pGender;

        String selectString = "SELECT "+
                    SQL_P_GENDER                                 +","+
                    SQL_P_SEXUAL                                 +","+
                    SQL_P_COUNTRY                                +","+
                    SQL_P_LANGUAGE                               +
                " FROM " + dbUsersTable + " WHERE "+ SQL_F_ID+"="+fUserID;
        
        try {

            Statement statement = mySQLConn.createStatement();//TODO muss man das jedes mal erzeugen
            ResultSet selectResultSet = statement.executeQuery(selectString);

            if (selectResultSet.next()) {

                    pSexual     = selectResultSet.getInt(SQL_P_SEXUAL);
                    pCountry    = selectResultSet.getString(SQL_P_COUNTRY);
                    pLanguage   = selectResultSet.getString(SQL_P_LANGUAGE);
                    pGender     = selectResultSet.getInt(SQL_P_GENDER);
                        

            }else
            {
                setUserAvailability("0");
                logger.error("User not found, setting connection to not availbable");
                return;
            }

        } catch (SQLException exception) {

            setUserAvailability("0");
            logger.error("SQLException at findPartner (currentproperteis): " + exception.getMessage());
            return;
        }


        selectString = "SELECT "+
                SQL_F_RED5CLIENT_ID                                 +","+
                SQL_F_SERVER_URL                                    +","+
                SQL_F_STRATUS_ID                                    +","+
                dbConnectionTable   +"."+SQL_F_ID+" as "+SQL_F_CONNECTION_ID   +
                " FROM " + dbConnectionTable +

                " JOIN " + dbUsersTable + " ON "+
                dbConnectionTable+"."+SQL_F_USER_ID+"="+dbUsersTable+"."+SQL_F_ID+

                " WHERE "+ SQL_F_AVAILABLE+"=1 ";
        
        if (fUDPEnabled == 0) {
            selectString += "AND "+SQL_F_UDP_ENABLED+"=0 ";
        } else {
            //UDP = 1 User können mit UDP=1 oder UDP=-1
            //UDP=-1 sollten mit UDP=1 zum testen. Wenn es
            //keine gibt dann mit UDP=-1 (dann testen beide gleichzeitig)
            //SIEHE ORDER BY
            selectString += "AND ("+SQL_F_UDP_ENABLED+"=1 OR "+SQL_F_UDP_ENABLED+"=-1) ";
        }

        //Dont call yourself
        selectString += "AND "+dbConnectionTable +"."+SQL_F_ID+"!=" + fConnectionID + " ";

        //Dont call your last partner
        selectString += "AND "+SQL_F_USER_ID+"!='" + fPartnerUserID + "' ";

        //camera, langauge and country filter
        selectString += "AND "+SQL_P_CAMERA_FILTER  +"<='" + Integer.toString(pCamera)         + "' ";
        selectString += "AND "+SQL_P_CAMERA         +">='" + Integer.toString(pCameraFilter)   + "' ";

        selectString += "AND ("+SQL_P_COUNTRY_FILTER  +"='" + pCountry + "' OR "+SQL_P_COUNTRY_FILTER+"='') ";
        if(!pCountryFilter.equals(""))
            selectString += "AND "+SQL_P_COUNTRY  +"='" + pCountryFilter + "' ";

        selectString += "AND ("+SQL_P_LANGUAGE_FILTER  +"='" + pLanguage + "' OR "+SQL_P_LANGUAGE_FILTER+"='') ";
        if(!pLanguageFilter.equals(""))
            selectString += "AND "+SQL_P_LANGUAGE  +"='" + pLanguageFilter + "' ";

        //sexual filter
        if(pSexualFilter==-1)//If I want not sexual
            selectString += "AND "+SQL_P_SEXUAL+"<0 ";
        else if(pSexualFilter==1)//If I want sexual
            selectString += "AND "+SQL_P_SEXUAL+">0 ";

        if(pSexual < 0) //if I am not sexual
             //I can be matched to users looking for not sexual or with no filter
            selectString += "AND "+SQL_P_SEXUAL_FILTER+"<= 0 ";
        else if(pSexual > 0)// If I am sexual
            //I can be matched to users looking for sexual or with no filter
            selectString += "AND "+SQL_P_SEXUAL_FILTER+">= 0 ";
        else // If I am 0 (in between) I can only be matched to users with no filter
            selectString += "AND "+SQL_P_SEXUAL_FILTER+"= 0 ";

        //gender filter
        if(pGenderFilter==-1)//If I want female
            selectString += "AND "+SQL_P_GENDER+"< 0 ";// <= 0 would imply that unrated groups are positive matches for gender filters
        else if(pGenderFilter==1)//If I want male
            selectString += "AND "+SQL_P_GENDER+"> 0 ";

        if(pGender < 0) //if I am femalse
             //I can be matched to users looking for female or with no filter
            selectString += "AND "+SQL_P_GENDER_FILTER+"<= 0 ";
        else if(pGender > 0)// If I am male
            //I can be matched to users looking for male or with no filter
            selectString += "AND "+SQL_P_GENDER_FILTER+">= 0 ";
        else // If I am 0 (in between or group) I can only be matched to users without filter
            selectString += "AND "+SQL_P_GENDER_FILTER+"= 0 ";


      
        selectString += "ORDER BY ";


       //Sexual filter quality  (highest priority)
        if(pSexualFilter==0)//if i have no filter, we assign him users that have no meaningfull ranking
            selectString +="ABS("+SQL_P_SEXUAL+") ASC, ";
        else if(pSexualFilter==-1)//if I want not sexual I prefer definitly negativ(=notsexual) ranked users
            selectString +=SQL_P_SEXUAL+" ASC, ";
        else//if I want sexual I prefer definitly positiv(=sexual) ranked users
            selectString +=SQL_P_SEXUAL+" DESC, ";

        //Gender filter quality
        if(pGenderFilter==0)//if i have no filter, we assign him users that have no meaningfull ranking
            selectString +="ABS("+SQL_P_GENDER+") ASC, ";
        else if(pGenderFilter==-1)//if I want female I prefer definitly negativ(=female) ranked users
            selectString +=SQL_P_GENDER+" ASC, ";
        else//if I want male I prefer definitly positiv(=male) ranked users
            selectString +=SQL_P_GENDER+" DESC, ";

        if(fUDPEnabled==-1)
            selectString +=SQL_F_UDP_ENABLED+" ASC, ";    // prefer to match UDP User with UDP Test USer
        else if(fUDPEnabled==-1)
            selectString +=SQL_F_UDP_ENABLED+" DESC, ";    // prefer to match UDP User with UDP Test USer


        selectString += "IF('" +serverURL+"'="+SQL_F_SERVER_URL+",0,1) ASC ";//prefer local connections
        selectString += "LIMIT 1 ";


        logger.error("findPartner: " + selectString);

        try {

            Statement statement = mySQLConn.createStatement();
            ResultSet selectResultSet = statement.executeQuery(selectString);

            if (selectResultSet.next()) {

                    String partnerServerURL = selectResultSet.getString(SQL_F_SERVER_URL);

                   if(partnerServerURL.equals(serverURL))
                   {
                       logger.error("Partner found on this server");
                      

                        if(!partnerForImmideateConnection(selectResultSet.getString(SQL_F_RED5CLIENT_ID)))
                        {
                            logger.error("Dead partner found, deleteing from database");
                            mySQLDeleteBzwUpdate(selectResultSet.getString(SQL_F_CONNECTION_ID));
                            FindPartner();
                        }
                   }else
                   {
                        logger.error("Partner found, but on other server");
                        logger.error("This feature is currently disabled, finding new Partner");
                        invoke(ON_PARTNER_FROM_OTHER_SERVER, new Object[]{
                            partnerServerURL, fPartnerClientID,
                                selectResultSet.getString(SQL_F_STRATUS_ID)});
                   }

            }else
            {
                setUserAvailability("1");
                logger.error("No Partner found");
            }

        } catch (SQLException exception) {

            logger.error("SQLException at findPartner: " + exception.getMessage());

        }
    }

     // sets this user to available
    public void setUserAvailability(String available) {

        String updateString = "UPDATE "+dbConnectionTable+" SET ";

        if(available.equals("1"))//If he is available, set all is properties
         updateString+=   SQL_P_CAMERA_FILTER   + "= '"+Integer.toString(pCameraFilter)  +"', "
                        + SQL_P_CAMERA          + "= '"+Integer.toString(pCamera)        +"', "
                        + SQL_P_GENDER_FILTER   + "= '"+Integer.toString(pGenderFilter)  +"', "
                        + SQL_P_SEXUAL_FILTER   + "= '"+Integer.toString(pSexualFilter)  +"', "
                        + SQL_P_LANGUAGE_FILTER + "= '"+                 pLanguageFilter +"', "
                        + SQL_P_COUNTRY_FILTER  + "= '"+                 pCountryFilter  +"', "
                        + SQL_F_UDP_ENABLED     + "= '"+Integer.toString(fUDPEnabled)    +"', ";
                        
         updateString+= SQL_F_AVAILABLE       + "= "+available+", "+ SQL_T_LAST_CALL+"=NOW() "
            + " WHERE "+SQL_F_ID+"    =" + fConnectionID;

        try {

            Statement statement = mySQLConn.createStatement();
            statement.executeUpdate(updateString);

            //info
            logger.error("Userconnection " + fConnectionID + " updated: " + updateString);

        } catch (SQLException exception) {

            logger.error("SQLException at setUserAvailability: " + exception.getMessage());

        }

    }

    static public void emtpyDB() 
    {
        logger.error("emtpy Database");
        Collection<User> userClientIDs = users.values();
        for(User u : userClientIDs)
            mySQLDeleteBzwUpdate(u.fConnectionID);
        try {
            mySQLConn.close();
        } catch (SQLException ex) {
            
        }
    }
    

    static private void mySQLDeleteBzwUpdate(String connectionID)
    {
            String deleteString;
            deleteString = "DELETE FROM " + dbConnectionTable + " WHERE " + 
                            SQL_F_ID + "=" + connectionID +
                    " AND "+SQL_F_SERVER_URL+"='"+serverURL+"'";

            try {

                Statement statement = mySQLConn.createStatement();
                statement.executeUpdate(deleteString);
                //info
                logger.error("User deleted from db: " + deleteString);

            } catch (SQLException exception) {

                logger.error("SQLException at mySQLDelete: " + exception.getMessage());

            }
    }


    static private String addSlashes(String str) {

        StringBuffer s = new StringBuffer((String) str);
        for (int i = 0; i < s.length(); i++) {
            switch (s.charAt(i)) {
                case '\'':
                case '"':
                case '\\':
                    s.insert(i++, '\\');
                    break;
                case '\0':
                    s.deleteCharAt(i);
                    break;
            }
        }

        return s.toString();

    }

    static public void onNotAvailable(String callerClientId, String calledStratusId) {
        logger.error("ON NOT AVAILABLE");
        User.get(callerClientId).invoke(User.ON_NOT_AVAILABLE,new Object[]{calledStratusId});
    }


    public void invokeOnCallInvitation(User partner)
    {
        logger.error(ON_CALL_INVITATION+" "+partner.fStratusID+" "+partner.fRed5ClientID);

           ((IServiceCapableConnection) fClient.getConnections().toArray()[0]).invoke(
                   ON_CALL_INVITATION, new Object[]{partner.fRed5ClientID,partner.fStratusID},new IPendingServiceCallback() {

            public void resultReceived(IPendingServiceCall call) {
                Object callerID=call.getResult();
                if(callerID==null)
                    logger.error("OnCallInvitation has been accepted");
                else
                {
                    logger.error("send NotAvailble to "+callerID);
                    onNotAvailable(callerID.toString(),fStratusID);
                }

            }
        });
    }

    public void invoke(String method,Object[] param)
    {
        //TODO welche Connection? Warum 0?

        ((IServiceCapableConnection) fClient.getConnections().toArray()[0]).invoke(method, param);
    }

    public void sendToPartner(String handler, String msg)
    {
        get(fPartnerClientID).invoke("onReceive",new Object[]{ handler,msg });
    }
}

