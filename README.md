# Weather Application using node

## This node application will display the weather conditions of provided search text

### Options
1. **address** (Address to check weather)

###  Commands
* **temp** (Configure Temperature)
  1. units
    * standard (Kelvin)
    * metric (Celsius)
    * imperial (Fahrenheit)

#### Examples
1. `node app.js --address "india"`

```
5 results found for "india"
Please select one from the following
1. (country) - India
2. (region) - Indiana, United States
3. (place) - Indianapolis, Indiana, United States
4. (place) - Indiana, Pennsylvania, United States
5. (poi) - Indianapolis International Airport (IND), 7800 Col H Weir Cook Mem Dr, Indianapolis, Indiana 46241, United States
prompt: row_number:  (1) 2
Address:  Indiana, United States
----------------
Mist - mist
Temperature is 7.48 *C, feels like 4.72 *C
Min temp: 6.67 *C. Max temp: 8.33 *C
Humidity: 100
```

2. `node app.js --address "india" temp --units "standard"`

```
5 results found for "india"
Please select one from the following
1. (country) - India
2. (region) - Indiana, United States
3. (place) - Indianapolis, Indiana, United States
4. (place) - Indiana, Pennsylvania, United States
5. (poi) - Indianapolis International Airport (IND), 7800 Col H Weir Cook Mem Dr, Indianapolis, Indiana 46241, United States
prompt: row_number:  (1) 4
Address:  Indiana, Pennsylvania, United States
----------------
Clear - clear sky
Temperature is 276.86 K, feels like 270.58 K
Min temp: 275.37 K. Max temp: 278.15 K
Humidity: 65
```
