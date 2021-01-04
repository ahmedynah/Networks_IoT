
#include <Servo.h> 
#include <LiquidCrystal.h>

int buzzer = 10;
int smokeA0 = A5;
// Your threshold value
int sensorThres = 800;
int servoPin = 5;
const int rs = 12;
const int en = 11;
const int d4 = 5;
const int d5 = 4;
const int d6 = 3;
const int d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);


 
Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;

void setup() {
 
  pinMode(buzzer, OUTPUT);
  pinMode(smokeA0, INPUT);
  myservo.attach(servoPin); 
   lcd.begin(16, 2);

  Serial.begin(9600);
}

void loop() {
  int analogSensor = analogRead(smokeA0);
  Serial.print("Pin A0: ");
  Serial.println(analogSensor);
  pos = 0;
  lcd.setCursor(0, 1);
// print the number of seconds since reset:
lcd.print(millis() / 1000);
  if (analogSensor > sensorThres)
  {   // Print a message to the LCD.
     lcd.print("ALERTT!!!!! SMOKE LEVEL =");
       myservo.write(360);
  }
  else
  {
    myservo.write(0);
    noTone(buzzer);
  }
  delay(100);
}
