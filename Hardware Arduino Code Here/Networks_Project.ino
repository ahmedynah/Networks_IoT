
//// Start of the communication variables and constants
//
      #include <SoftwareSerial.h>
      #define RX 2
      #define TX 3

      
      String AP = "WE_9ECDBE";       // AP NAME
      String PASS = "j9d02620"; // AP PASSWORD
      String API = "0YABO95QVPFSTWJK";   // Write API KEY
      String HOST = "api.thingspeak.com";
      String PORT = "80";
      int countTrueCommand;
      int countTimeCommand; 
      boolean found = false; 
        
      SoftwareSerial esp8266(RX,TX); 
//
////End of communication varaibles and definitions

//________________________________________________________//

//// Start of hardware libraries, bins definitions, variables 
      #include <Servo.h> 
      
      int buzzer = 10;
      int smokeA0 = A5;
      int sensorThres = 800;
      int servoPin = 5;
      
      Servo myservo; 
      
      int pos = 0;

//
////End of Start of hardware libraries, bins definitions, variables 

//_____________________________________________________________//
void sendCommand(String command, int maxTime, char readReplay[]) {
  Serial.print(countTrueCommand);
  Serial.print(". at command => ");
  Serial.print(command);
  Serial.print(" ");
  while(countTimeCommand < (maxTime*1))
  {
    esp8266.println(command);//at+cipsend
    if(esp8266.find(readReplay))//ok
    {
      found = true;
      break;
    }
  
    countTimeCommand++;
  }
  
  if(found == true)
  {
    Serial.println("OYI");
    countTrueCommand++;
    countTimeCommand = 0;
  }
  
  if(found == false)
  {
    Serial.println("Fail");
    countTrueCommand = 0;
    countTimeCommand = 0;
  }
  
  found = false;
 }

void setup() {

  pinMode(buzzer, OUTPUT);
  pinMode(smokeA0, INPUT);
  myservo.attach(servoPin); 
  
  //______________//
  Serial.begin(9600);
  esp8266.begin(9600);
  sendCommand("AT",5,"OK");
  sendCommand("AT+CWMODE=1",5,"OK");
  sendCommand("AT+CWJAP=\""+ AP +"\",\""+ PASS +"\"",20,"OK");
  //______________//
}

void loop() {
  
 String getData = "GET /update?api_key="+ API +"&field1="+getGasValue()+"&field2="+getServo_Status();
 sendCommand("AT+CIPMUX=1",5,"OK");
 sendCommand("AT+CIPSTART=0,\"TCP\",\""+ HOST +"\","+ PORT,15,"OK");
 sendCommand("AT+CIPSEND=0," +String(getData.length()+4),4,">");
 esp8266.println(getData);
 delay(1500);countTrueCommand++;
 sendCommand("AT+CIPCLOSE=0",5,"OK");
}


String getGasValue(){
 int gasSensor = analogRead(smokeA0);  
    if (gasSensor > sensorThres)
  {   
//       myservo.write(360);
       if(pos == 0)setHigh();
       digitalWrite(buzzer, HIGH);
  }
  else
  {
//    myservo.write(0);
    if(pos == 180)setLow();
    digitalWrite(buzzer,LOW);
  }

   Serial.print(" Gas Level= ");
   Serial.println(gasSensor); 
     Serial.println(pos);

   delay(50);
   return String(gasSensor); 
  
}


String getServo_Status(){
  Serial.println("in");
  Serial.println(pos);
  if(pos > 90 )
    return "1";
   else
   return "0";
}

void setHigh(){
    pos = 180;
    myservo.write(180);              // tell servo to go to position in variable 'pos'
    Serial.println(pos);
    delay(15);                       // waits 15ms for the servo to reach the position
}

void setLow(){
    pos = 0;
    myservo.write(0);              // tell servo to go to position in variable 'pos'
    Serial.println(pos);
    delay(15);                       // waits 15ms for the servo to reach the position
  }


//void sendCommand(String command, int maxTime, char readReplay[]) {
//  Serial.print(countTrueCommand);
//  Serial.print(". at command => ");
//  Serial.print(command);
//  Serial.print(" ");
//  while(countTimeCommand < (maxTime*1))
//  {
//    esp8266.println(command);//at+cipsend
//    if(esp8266.find(readReplay))//ok
//    {
//      found = true;
//      break;
//    }
//  
//    countTimeCommand++;
//  }
//  
//  if(found == true)
//  {
//    Serial.println("OYI");
//    countTrueCommand++;
//    countTimeCommand = 0;
//  }
//  
//  if(found == false)
//  {
//    Serial.println("Fail");
//    countTrueCommand = 0;
//    countTimeCommand = 0;
//  }
//  
//  found = false;
// }
