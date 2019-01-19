#ID and Passport Swipe Parser

##Description
Designed for the use of Hotel/Youth Hostel/Accommodation providers. Will take the OCR string from an MRZ Scanner for example the 3M CR100.

##Usage
Include the idreader package like so `var idscanner = require("idscanner");`.

*idreader* has one functional method **ParseInputString** which takes the string as read from the passport/id swipe machine.

*idreader* has one exmaple method **returnTestData**.

##Example Usage
`var idscanner = require("idscanner");

//ONCE YOU HAVE COLLECTED YOUR SWIPE FROM THE PASSPORT/ID SWIPE READER INSERT IT AS THE PARAMETER TO ParseInputString
var parsedData = ParseInputString("START\nOCR LINE 1: P<RUSMALBORSKYI<<KOVBOJ<<<<<<<<<<<<<<<<<<<<<\nOCR LINE 2: 7553279419RUS8712242M2104131<<<<<<<<<<<<<<02\nOCR LINE 3:\nMSR LINE 1:\nMSR LINE 2:\nMSR LINE 3:\nEND");

//TO GET AN EXAMPLE RESULT OBJECT OUT CALL returnTestData
var exampleParsedData = returnTestData();
`


