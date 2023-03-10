/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 

function findSearchTermInBooks(searchTerm, scannedTextObj) {
    var resultList = [] // temporary list to return at the end of checking all the books

    if(searchTerm != "" && scannedTextObj.length>0){ // checks input to see if there are books scanned
        for(var iBook=0; iBook<scannedTextObj.length; iBook++){
            var book = scannedTextObj[iBook];
            if(book.Content.length >0){ // checks to see if the book has scanned content, goes to next book if not
                var isbn = book.ISBN
                var lineBreakMap = new Map(); // store values when checking for terms in linebreaks, stores line number, beginning half of word
                var previousLineHasBreak = false 
                for(var iContent=0; iContent<book.Content.length; iContent++){ // goes through all the lines scanned 
                    var lineNum = book.Content[iContent].Line;
                    var pageNum = book.Content[iContent].Page;
                    var text = book.Content[iContent].Text;
                    text = text.replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g,""); // removes punctuation from the line before searching it
                    var textArray = text.split(" "); 
                    if(textArray.includes(searchTerm)){ // if the search term is in the text then add the result to the list of compiled results
                        resultList.push(
                            {
                                "ISBN": isbn,
                                "Page": pageNum,
                                "Line": lineNum
                            }
                        );
                    }else{ // if the search term is not found in the text then it may be part of a line break with the previous line (if the previous line is scanned)
                        if(previousLineHasBreak){ // if there is a line break and the previous line scanned is on the same page exactly one line before the current one and the word split with the dash matches the search term, then the result includes both lines 
                            var previousWord = lineBreakMap.get(iContent-1);
                            if(previousWord+textArray[0] == searchTerm && 
                                pageNum == book.Content[iContent-1].Page && 
                                lineNum == book.Content[iContent-1].Line + 1){
                                var previousResult = {
                                    "ISBN": isbn,
                                    "Page": book.Content[iContent-1].Page,
                                    "Line": book.Content[iContent-1].Line
                                }
                                if(!resultList.some( // if the previous line is already in the compile list of results, don't add the previous line, otherwise add the previous line because it includes half the search term (Test Case 11)
                                    (r) => ((r.ISBN==previousResult.ISBN)&& // checks if any result "r" in the list of compiled results is the same result as the previous line, adds the result in the result list if not found
                                            (r.pageNum==previousResult.pageNum)&&
                                            (r.LineNum==previousResult.LineNum)))){
                                                resultList.push(previousResult); 

                                }
                                resultList.push(
                                {
                                    "ISBN": isbn,
                                    "Page": pageNum,
                                    "Line": lineNum
                                }
                            );
                            }
                            else{
                                previousLineHasBreak = false;
                            }
                        }
                    }
                    var lastWord = textArray[textArray.length - 1] // after a line has been processed, check if it has a line break because the next line scanned maybe be the next line starting off with the second half of the term and should be included in the results
                    if(lastWord.charAt(lastWord.length-1)=="-"){
                        previousLineHasBreak =  true;
                        lineBreakMap.set(iContent, lastWord.substring(0, lastWord.length-1)) // if a linebreak is found, store the last word 
                    }
                }
            }
        }
    }
    var result = {
        "SearchTerm": searchTerm,
        "Results": resultList 
    };
    
    return result; 
}


/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */

/*
Test Case 1: Term present
Description: If a search term in 1 book with multiple lines is present, then the result should include all lines with term present
Input: Search term "the" with 1 book and 3 lines, only line 9 contains term
Expected Output: Only line 9 included in the result
*/
/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const test1Result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1Result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1Result);
}

/** We could choose to check that we get the right number of results. */
const test2Result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2Result.Results.length == twentyLeaguesOut.Results.length) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2Result.Results.length);
}

/*
Test Case 2: No books
Description: If no books are inputted then there should not be any results returned
Input: Search term "the" with an empty list of books
Expected Output: Empty list of results
*/
const testCase2In = []
const testCase2Term = "the"
const testCase2Out = {
    "SearchTerm": testCase2Term,
    "Results": []
}

const testCase2Result = findSearchTermInBooks(testCase2Term, testCase2In);
if (JSON.stringify(testCase2Out) === JSON.stringify(testCase2Result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", testCase2Out);
    console.log("Received:", testCase2Result);
}

/*
Test Case 3: No content
Description: If there is a book but no lines are scanned then there should not be any results returned
Input: Search term "the" and 1 book with empty content
Expected Output: Empty list of results 
*/
const testCase3In = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [] 
    }
]
const testCase3Term = "the"
const testCase3Out = {
    "SearchTerm": testCase3Term,
    "Results": []
}
const testCase3Result = findSearchTermInBooks(testCase3Term, testCase3In);
if (JSON.stringify(testCase3Out) === JSON.stringify(testCase3Result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", testCase3Out);
    console.log("Received:", testCase3Result);
}

/*
Test Case 4: No search term
Description:If there is no search term then there should not be any results returned 
Input: search term "" with 1 book and 3 lines
Expected Output: Empty list of results
*/
const testCase4In = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
        ] 
    }
]
const testCase4Term = ""
const testCase4Out = {
    "SearchTerm": testCase4Term,
    "Results": []
}

const testCase4Result = findSearchTermInBooks(testCase4Term, testCase4In);
if (JSON.stringify(testCase4Out) === JSON.stringify(testCase4Result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", testCase4Out);
    console.log("Received:", testCase4Result);
}

/*
Test Case 5: Search term with multiple books and multiple lines inputted should return lines with term present
Input: search term "dog" with 2 book and 3 lines scanned each
Expected Output: Book 1 line 1, Book 2 line 1,2 outputted
*/
const testCase5In = [
    {
        "Title": "Book 1",
        "ISBN": "1234",
        "Content": [
            {
                "Page": 100,
                "Line": 1,
                "Text": "the dog eats food"
            },
            {
                "Page": 101,
                "Line": 2,
                "Text": "more text here"
            },
            {
                "Page": 102,
                "Line": 3,
                "Text": "even more text here"
            } 
        ] 
    },
    {
        "Title": "Book 2",
        "ISBN": "2345",
        "Content": [
            {
                "Page": 100,
                "Line": 1,
                "Text": "I like the dog"
            },
            {
                "Page": 101,
                "Line": 2,
                "Text": "hello hello the dog hello"
            },
            {
                "Page": 102,
                "Line": 3,
                "Text": "more text here"
            } 
        ] 
    },
]
const testCase5Term = "dog"    
const testCase5Out = {
    "SearchTerm": testCase5Term,
    "Results": [
        {
            "ISBN": "1234",
            "Page": 100,
            "Line": 1
        },
        {
            "ISBN": "2345",
            "Page": 100,
            "Line": 1
        },
        {
            "ISBN": "2345",
            "Page": 101,
            "Line": 2
        },
    ]
}

const testCase5Result = findSearchTermInBooks(testCase5Term, testCase5In);
if (JSON.stringify(testCase5Out) === JSON.stringify(testCase5Result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", testCase5Out);
    console.log("Received:", testCase5Result);
}

/*
Test Case 6: Search term with multiple books and multiple lines inputted should return no results if the term isn't found
Input: search term "cat" with 2 book and 3 lines scanned each
Expected Output: No results
*/
const testCase6In = [
    {
        "Title": "Book 1",
        "ISBN": "1234",
        "Content": [
            {
                "Page": 100,
                "Line": 1,
                "Text": "the cat eats food"
            },
            {
                "Page": 101,
                "Line": 2,
                "Text": "more text here"
            },
            {
                "Page": 102,
                "Line": 3,
                "Text": "even more text here"
            } 
        ] 
    },
    {
        "Title": "Book 2",
        "ISBN": "2345",
        "Content": [
            {
                "Page": 100,
                "Line": 1,
                "Text": "I like the cat"
            },
            {
                "Page": 101,
                "Line": 2,
                "Text": "hello hello the cat hello"
            },
            {
                "Page": 102,
                "Line": 3,
                "Text": "more text here"
            } 
        ] 
    },
]
const testCase6Term = "dog"    
const testCase6Out = {
    "SearchTerm": testCase5Term,
    "Results": []
}

const testCase6Result = findSearchTermInBooks(testCase6Term, testCase6In);
if (JSON.stringify(testCase6Out) === JSON.stringify(testCase6Result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", testCase6Out);
    console.log("Received:", testCase6Result);
}

/*
Test Case 7: Search term and lines including term in different cases should only return lines with the term in the correct case
Input: search term "Dog" with 1 book and 3 lines scanned
Expected Output: Book 1 line 2 outputted
*/
const testCase7In = [
    {
        "Title": "Book 1",
        "ISBN": "1234",
        "Content": [
            {
                "Page": 100,
                "Line": 1,
                "Text": "the dog eats food"
            },
            {
                "Page": 100,
                "Line": 2,
                "Text": "Dog eats food"
            },
            {
                "Page": 100,
                "Line": 3,
                "Text": "THE DOG"
            },
        ] 
    },
]
const testCase7Term = "Dog"    
/** Example output object */
const testCase7Out = {
    "SearchTerm": testCase7Term,
    "Results": [
        {
            "ISBN": "1234",
            "Page": 100,
            "Line": 2
        },
    ]
}

const testCase7Result = findSearchTermInBooks(testCase7Term, testCase7In);
if (JSON.stringify(testCase7Out) === JSON.stringify(testCase7Result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", testCase7Out);
    console.log("Received:", testCase7Result);
}

/*
Test Case 8: Search term in lines with punctuation around the term should still find the term and return lines with the term in it
Input: search term "dog" with 1 book and 4 lines scanned, punctuation around term in all 4 lines
Expected Output: Book 1 line 2 outputted
*/
/** Example input object. */
const testCase8In = [
    {
        "Title": "Book 1",
        "ISBN": "1234",
        "Content": [
            {
                "Page": 100,
                "Line": 1,
                "Text": "the dog!"
            },
            {
                "Page": 100,
                "Line": 2,
                "Text": "(dog) cat"
            },
            {
                "Page": 100,
                "Line": 3,
                "Text": "the dog, is big"
            } 
        ] 
    },
]
const testCase8Term = "dog"
const testCase8Out = {
    "SearchTerm": testCase8Term,
    "Results": [
        {
            "ISBN": "1234",
            "Page": 100,
            "Line": 1
        },
        {
            "ISBN": "1234",
            "Page": 100,
            "Line": 2
        },
        {
            "ISBN": "1234",
            "Page": 100,
            "Line": 3
        }
    ]
}

const testCase8Result = findSearchTermInBooks(testCase8Term, testCase8In);
if (JSON.stringify(testCase8Out) === JSON.stringify(testCase8Result)) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", testCase8Out);
    console.log("Received:", testCase8Result);
}


/*
Test Case 9: Lines with the search term inside of another word should not be returned
Input: search term "cone" with 1 book and 2 lines scanned
Expected Output: Book 1 line 1
*/
const testCase9In = [
    {
        "Title": "Book 1",
        "ISBN": "1234",
        "Content": [
            {
                "Page": 100,
                "Line": 1,
                "Text": "the cone was orange"
            },
            {
                "Page": 100,
                "Line": 1,
                "Text": "the pinecone on the tree"
            },
        ] 
    },
]
const testCase9Term = "cone"
const testCase9Out = {
    "SearchTerm": testCase9Term,
    "Results": [
        {
            "ISBN": "1234",
            "Page": 100,
            "Line": 1
        }
    ]
}

const testCase9Result = findSearchTermInBooks(testCase9Term, testCase9In);
if (JSON.stringify(testCase9Out) === JSON.stringify(testCase9Result)) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", testCase9Out);
    console.log("Received:", testCase9Result);
}

/*
Test Case 10: If a term is split between a pagebreak and both lines including the term are scanned, then both lines should be included in the results.
Input: search term "darkness" with 1 book and 3 lines scanned and the term is cut by a page break
Expected Output: Book 1 line 1
*/
const testCase10In = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
const testCase10Term = "darkness"
const testCase10Out = {
    "SearchTerm": testCase10Term,
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const testCase10Result = findSearchTermInBooks(testCase10Term, testCase10In);
if (JSON.stringify(testCase10Out) === JSON.stringify(testCase10Result)) {
    console.log("PASS: Test 11");
} else {
    console.log("FAIL: Test 11");
    console.log("Expected:", testCase10Out);
    console.log("Received:", testCase10Result);
}

/*
Test Case 11: If a term is in split with a page break but the next line isn't the next line of the page, then neither line should be included in the result (even if the split term is the whole term across 2 pages) 
("dark-" and "ness" make up the search term darkness but "dark-" is on page 31 and "ness" is on page 32 so they would not be included as a result)
Input: search term "darkness" with 1 book and 3 lines scanned, page break occurs in the middle of the term of the first line and second half of the word is in the second scanned content but the lines are not sequential
Expected Output: No results
*/
const testCase11In = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 1,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 32,
                "Line": 1,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 33,
                "Line": 1,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
const testCase11Term = "darkness"
const testCase11Out = {
    "SearchTerm": testCase11Term,
    "Results": []
}

const testCase11Result = findSearchTermInBooks(testCase11Term, testCase11In);
if (JSON.stringify(testCase11Out) === JSON.stringify(testCase11Result)) {
    console.log("PASS: Test 12");
} else {
    console.log("FAIL: Test 12");
    console.log("Expected:", testCase11Out);
    console.log("Received:", testCase11Result);
}

/*
Test Case 12: If a term is inside of a line as well as split between the pagebreak at the end of a line with the subsequent line also scanned, then only one instance of the line including the term should be included in the result
Input: Search term "darkness" with 3 lines scanned, the first line contains the term darkness and also ends in the word darkness split by a pagebreak with the rest of the word continued on the next line
Expected Output: Line 1 included in results only once
*/
const testCase12In = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 1,
                "Text": "now simply went on by her own darkness momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 2,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 2,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
const testCase12Term = "darkness"
const testCase12Out = {
    "SearchTerm": testCase12Term,
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 1
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 2
        }
    ]
}

const testCase12Result = findSearchTermInBooks(testCase12Term, testCase12In);
if (JSON.stringify(testCase12Out) === JSON.stringify(testCase12Result)) {
    console.log("PASS: Test 13");
} else {
    console.log("FAIL: Test 13");
    console.log("Expected:", testCase12Out);
    console.log("Received:", testCase12Result);
}