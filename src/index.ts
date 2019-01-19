module.exports.outputData = function(idString: string){
	console.log("Number of lines in string: " + ParseInputString(idString));
}

let passportExample = `START
OCR LINE 1: P<RUSMALBORSKYI<<KOVBOJ<<<<<<<<<<<<<<<<<<<<<
OCR LINE 2: 7553279419RUS8712242M2104131<<<<<<<<<<<<<<02
OCR LINE 3:
MSR LINE 1:
MSR LINE 2:
MSR LINE 3:
END`

class IDData{
    forename: string;
    surname: string;
    gender: string;
    dob: Date;
    idNumber: string;
    expiryDate: Date;
    countryOfIssueISO3: string;
    nationalityISO3: string;
    type: string;
}


//WILL TAKE INPUT STRING AS OUTPUT BY READER AND RETURN IDDATA OBJECT
function ParseInputString(inputString: string): IDData{
    let outData = new IDData();
    //THERE ARE TWO DIFFERENT VERSIONS OF THE OUTPUT FROM THE READER - DEPENDING ON DRIVER VERSION
    //IF USING THE NEWER 8 LINE OUTPUT THIS WILL CONVERT TO THE OLDER 5 LINE
    const pattern: RegExp = /\n/g;
    if(inputString.indexOf("_") !== -1){
        throw new Error("SWIPE ERROR PLEASE TRY AGAIN");
    }
    console.log(inputString);
    let idLines = inputString.split(pattern);
    let patterns: RegExp[] = [/^MSR/, /^START/, /^END/];
    idLines = checkArrayForPatterns(idLines, patterns);
    let numberLines = idLines.length;
    idLines[0] = idLines[0].replace("OCR LINE 1: ","");
    idLines[1] = idLines[1].replace("OCR LINE 2: ","");
    idLines[2] = idLines[2].replace("OCR LINE 3: ","");
    if(idLines[0].substring(0,1) =='P'){
        outData.type = 'P';
        idLines.splice(2, 1);
    }
    else if(idLines[0] == 'I'){
        outData.type = 'I'
    }
    console.log(idLines);
    outData.countryOfIssueISO3 = idLines[0].substr(2,3);
    outData.surname =  idLines[0].substr(5,  idLines[0].indexOf("<<") - 5);
    var el1 = idLines[0].indexOf("<",idLines[0].indexOf("<<") + 2);
    var el2 = (idLines[0].indexOf("<<") + 2);
    outData.forename = idLines[0].substr(idLines[0].indexOf("<<") + 2, el1 - el2);
    outData.idNumber = idLines[1].substring(0,9);
    outData.nationalityISO3 = idLines[1].substring(10,13);
    outData.dob = new Date(Date.UTC(Number(idLines[1].substring(13,15)),Number(idLines[1].substring(15,17)) - 1, Number(idLines[1].substring(17,19))));
    outData.expiryDate = new Date(Date.UTC(Number(idLines[1].substring(21,23)) + 2000,Number(idLines[1].substring(23,25)) - 1,Number(idLines[1].substring(25,27))));
    outData.gender = idLines[1].substring(20,21);
    
    return outData;
}

function checkArrayForPatterns(arrayToCheck: string[],patterns: RegExp[]): string[]{
    let outputStrings: string[] =  [];

    arrayToCheck.forEach(function(elementToCheck){
        let passCheck = true;
        patterns.forEach(function(patternToCheck){
            if(elementToCheck.search(patternToCheck) !== -1){
                passCheck = false;
                return;
            }
        })
        if(passCheck){
            outputStrings.push(elementToCheck);
        }
    })
    return outputStrings;
}

module.exports.returnTestData = function(): IDData{
    return ParseInputString(passportExample);
}