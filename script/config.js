var DEBUG = false;
var UPLOAD_API = 'https://traprange-invoice.herokuapp.com/upload';
var BASE_API_URL = null;

if(DEBUG) {
  UPLOAD_API = 'http://localhost:8080/upload';
}

BASE_API_URL = UPLOAD_API + "/";

var sampleJson = {
  "tables":[
    {
      "headers":[
        "NO",
        "ACTIVITY",
        "QTY",
        "RATE",
        "AMOUNT"
      ],
      "rows":[
        [
          "1",
          [
            "HOUSE KEEPING SERVICE CHARGES",
            "4 BOYS AT YOUR END FOR THE MONTH OF AUGUST-2015.",
            "TOTAL PRESENT DAYS - 97 DAYS                354.83*97 =",
            "34,419/-"
          ],
          "4",
          "8,604.75",
          "34,419.00"
        ],
        [
          "2",
          [
            "Management Fees",
            "10% OF THE BILL FOR THE MONTH OF AUGUST 2015"
          ],
          "4",
          "860.50",
          "3,442.00"
        ]
      ]
    },
    {
      "headers":[
        "RATE",
        "TAX",
        "NET"
      ],
      "rows":[
        [
          "Service Tax @ 14%",
          "5,300.54",
          "37,861.00"
        ]
      ]
    }
  ],
  "matches":{
    "SUBTOTAL":"37,861.00",
    "TAX":"5,300.54",
    "TOTAL":"43,161.54",
    "ROUND OFF AMOUNT":"0.46",
    "INVOICE NO.":"Pune-1036",
    "BALANCE DUE":[
      "Rs43,162.00"
    ]
  }
};
