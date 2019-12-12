// Decode an uplink message from a buffer
// example: 0A02019014880323B6F0AFB302BF20

function Decoder(bytes, port)
{
	var decoded = {};
	var i = 0;
	var sensor_types = {
			0  : {'size': 1, 'name': 'Digital Input'	  ,},
			1  : {'size': 1, 'name': 'Digital Output'     ,},
			2  : {'size': 2, 'name': 'Analog Input'       ,},
			3  : {'size': 2, 'name': 'Analog Output'      ,},
			101: {'size': 2, 'name': 'Illuminance Sensor' ,},
			102: {'size': 1, 'name': 'Presence Sensor'    ,},
			103: {'size': 2, 'name': 'Temperature Sensor' ,},
			104: {'size': 1, 'name': 'Humidity Sensor'    ,},
			113: {'size': 6, 'name': 'Accelerometer'      ,},
			115: {'size': 2, 'name': 'Barometer'          ,},
			134: {'size': 6, 'name': 'Gyrometer'          ,},
			136: {'size': 9, 'name': 'GPS Location'       ,},};

	decoded.type = "position";

	if (port === 2){
		while(i < bytes.length){
			s_ch = bytes[i++]; 	//Channel
			s_type = bytes[i++];	//Message Type
			s_size = sensor_types[s_type].size; //Data length

			switch (s_type) {
			case 0  :  // Digital Input
			case 1  :  // Digital Output
			case 2  :  // Analog Input
				decoded.battery=((bytes[2]<<8 | bytes[3]))/100;
				break;
			case 3  :  // Analog Output
			case 101:  // Illuminance Sensor
			case 102:  // Presence Sensor
			case 103:  // Temperature Sensor
			case 104:  // Humidity Sensor
			case 113:  // Accelerometer
			case 115:  // Barometer
			case 136:
				decoded.latitude = (bytes[6]<<24>>8 | bytes[7]<<8 | bytes[8])/10000;
				decoded.longitude = (bytes[9]<<24>>8 | bytes[10]<<8 | bytes[11])/10000;
				decoded.altitude=((bytes[12]<<16 | bytes[13]<<8 | bytes[14])/100);
				break;
			}
			i += s_size;
		}
	}
return decoded;
}
