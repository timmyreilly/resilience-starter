Create push pin add metadata: https://bingmapsv8samples.azurewebsites.net/#Create%20Pushpin%20Add%20Metadata
Good samples for continued development: https://bingmapsv8samples.azurewebsites.net/ 

Sample .env file (*place next to app.js*): 

```
BingMapsKey=asdfpDJtO8wtNnk1wNFdz2blihxwv8mPZdB5vEJR7epV3tluq67AFF75nFgVGzMH
PORT=8080

TABLE_NAME=BingMeta
PARTITION_KEY=meta
STORAGE_NAME=500Storage
STORAGE_KEY=asdfasdfasdf/08TTrA/n+/QMSJMUPWERmqwNOJ24tNftqS/v9vF+mIq+r8pfB58f3yIzC343cnPQclxA==
STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=500starter9eef;AccountKey=asdfasdfasdf/08TTrA/n+/QMSJMUPWERmqwNOJ24tNftqS/v9vF+mIq+r8pfB58f3yIzC343cnPQclxA==;EndpointSuffix=core.windows.net

```

Also the BingMapsCredentials.js file (*place inside of public*): 
```
//Update this value with your Bing Maps key.
var BingMapsKey = 'asdfasdfasdftNnk1wNFdz2blihxwv8mPZdB5vEJR7epV3tluq67AFF75nFgVGzMH';

```

### Asset List: 
Supplies
Staff
Food
Water
Energy/Fuel
Medical
Open Space
Shelter

### TO-DOs:
- Add asset selection tab
- Customize asset icons
- Figure out how to Make Aerial Mode less slow
- 