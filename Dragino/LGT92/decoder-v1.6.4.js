function Decoder(bytes, port) {
// Decode an uplink message from a buffer
// (array) of bytes to an object of fields.

var latitude;//gps latitude,units: °
  latitude=(bytes[0]<<24 | bytes[1]<<16 | bytes[2]<<8 | bytes[3])/1000000;//gps latitude,units: °

var longitude;
  longitude=(bytes[4]<<24 | bytes[5]<<16 | bytes[6]<<8 | bytes[7])/1000000;//gps longitude,units: °

var alarm=(bytes[8] & 0x40)?"TRUE":"FALSE";//Alarm status


var batV=(((bytes[8] & 0x3f) <<8) | bytes[9])/1000;//Battery,units:V

if((bytes[10] & 0xC0)==0x40)
{
  var motion_mode="Move";
}
else if((bytes[10] & 0xC0) ==0x80)
{
  motion_mode="Collide";
}
else if((bytes[10] & 0xC0) ==0xC0)
{
  motion_mode="User";
}
else
{
  motion_mode="Disable";
}                                            //mode of motion

var led_updown=(bytes[10] & 0x20)?"ON":"OFF";//LED status for position,uplink and downlink

var Firmware = 160+(bytes[10] & 0x1f);  // Firmware version; 5 bits 


var roll=(bytes[11]<<8 | bytes[12])/100;//roll,units: °


var pitch=(bytes[13]<<24>>16 | bytes[14])/100; //pitch,units: °

var hdop = 0;
if(bytes[15] > 0)
{
   hdop =bytes[15]/100; //hdop,units: °
}
else
{
   hdop =bytes[15];
}

var altitude =(bytes[16]<<8 | bytes[17]) / 100; //Altitude,units: °

return {
Latitude: latitude,
Longitude: longitude,
Roll: roll,
Pitch:pitch,
BatV:batV,
ALARM_status:alarm,
MD:motion_mode,
LON:led_updown,
FW:Firmware,
HDOP:hdop,
Altitude:altitude,
};
}