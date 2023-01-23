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

// check inputs
// iterate through books if there are more than 0 books
// check if there is content for each book
// for each book that has content, look for the word
// if the word is found add it to the results list
// return the results list after all books have been iterated through

 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var resultList = [] // temporary list to return at the end of checking all the books

    if(searchTerm != "" && scannedTextObj.length>0){ // checks inputs to see if there are books in the input
        for(var iBook=0; iBook<scannedTextObj.length; iBook++){
            var book = scannedTextObj[iBook];
            if(book.Content.length >0){ // checks to see if the book has scanned content, skips this if and goes to next book if not
                var isbn = book.ISBN
                for(var iContent=0; iContent<book.Content.length; iContent++){
                    var lineNum = book.Content[iContent].Line;
                    var pageNum = book.Content[iContent].Page;
                    var text = book.Content[iContent].Text;

                    var textArray = text.split(" "); // converts the string of text into an array with each word being an element of the array
                    if(textArray.includes(searchTerm)){ // checks if the search term is in the text by checking the array
                        resultList.push( // if the term is found, add the page and line number to the temporary array to be returned at the end
                            {
                                "ISBN": isbn,
                                "Page": pageNum,
                                "Line": lineNum
                            }
                        )
                    }
                }
            }
        }
    }
    var result = {
        "SearchTerm": searchTerm,
        "Results": resultList // subs in the temporary array of books to be included in the return object
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
Test Case 1: 1 search term in 1 book with 3 lines should return lines with term present
Input: search term "the" with 1 book and 3 lines
Expected Output: line 9 outputted
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
    console.log("Received:", test2result.Results.length);
}

/*
Test Case 2: No books inputted should return empty results
Input: Search term "the" with empty list of books
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

if (testCase2Result.Results.length == testCase2Out.Results.length) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", testCase2Out.Results.length);
    console.log("Received:", testCase2Result.Results.length);
}

/*
Test Case 3: No lines scanned should return empty results
Input: "the" and 1 book with empty content
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
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", testCase3Out);
    console.log("Received:", testCase3Result);
}

if (testCase3Result.Results.length == testCase3Out.Results.length) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", testCase3Out.Results.length);
    console.log("Received:", testCase3Result.Results.length);
}

/*
Test Case 4: No search term in 1 book with 3 lines should return empty results
Input: search term "" with 1 book and 3 lines
Expected Output: line 9 outputted
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
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", testCase4Out);
    console.log("Received:", testCase4Result);
}
if (testCase4Result.Results.length == testCase4Out.Results.length) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", testCase4Out.Results.length);
    console.log("Received:", testCase4Result.Results.length);
}

/*
Test Case 5: Search term with multiple books and multiple lines inputted should return lines with term present
Input: search term "the" with 2 book and 3 lines scanned each
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
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", testCase5Out);
    console.log("Received:", testCase5Result);
}
if (testCase5Result.Results.length == testCase5Out.Results.length) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", testCase5Out.Results.length);
    console.log("Received:", testCase5Result.Results.length);
}

/*
Test Case 6: Search term and lines including term in different cases should only return lines with the term in the correct case
Input: search term "Dog" with 1 book and 3 lines scanned
Expected Output: Book 1 line 2 outputted
*/
const testCase6In = [
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
const testCase6Term = "Dog"    
/** Example output object */
const testCase6Out = {
    "SearchTerm": testCase6Term,
    "Results": [
        {
            "ISBN": "1234",
            "Page": 100,
            "Line": 2
        },
    ]
}

const testCase6Result = findSearchTermInBooks(testCase6Term, testCase6In);
if (JSON.stringify(testCase6Out) === JSON.stringify(testCase6Result)) {
    console.log("PASS: Test 11");
} else {
    console.log("FAIL: Test 11");
    console.log("Expected:", testCase6Out);
    console.log("Received:", testCase6Result);
}

/** We could choose to check that we get the right number of results. */
if (testCase6Result.Results.length == testCase6Out.Results.length) {
    console.log("PASS: Test 12");
} else {
    console.log("FAIL: Test 12");
    console.log("Expected:", testCase6Out.Results.length);
    console.log("Received:", testCase6Result.Results.length);
}

/*
Test Case 7: Search term in lines with punctuation around the term should still find the term and return lines with the term in it
Input: search term "dog" with 1 book and 4 lines scanned, punctuation around term in all 4 lines
Expected Output: Book 1 line 2 outputted
*/
/** Example input object. */
const testCase7In = [
    {
        "Title": "Book 1",
        "ISBN": "1234",
        "Content": [
            {
                "Page": 100,
                "Line": 1,
                "Text": "the -dog- eats food"
            },
            {
                "Page": 100,
                "Line": 2,
                "Text": "the dog!"
            },
            {
                "Page": 100,
                "Line": 3,
                "Text": "-dog cat"
            },
            {
                "Page": 100,
                "Line": 4,
                "Text": "the dog, is big"
            } 
        ] 
    },
]
const testCase7Term = "dog"
const testCase7Out = {
    "SearchTerm": testCase7Term,
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
        },
        {
            "ISBN": "1234",
            "Page": 100,
            "Line": 4
        }
    ]
}

const testCase7Result = findSearchTermInBooks(testCase7Term, testCase7In);
if (JSON.stringify(testCase7Out) === JSON.stringify(testCase7Result)) {
    console.log("PASS: Test 13");
} else {
    console.log("FAIL: Test 13");
    console.log("Expected:", testCase7Out);
    console.log("Received:", testCase7Result);
}

/** We could choose to check that we get the right number of results. */
if (testCase7Result.Results.length == testCase7Out.Results.length) {
    console.log("PASS: Test 14");
} else {
    console.log("FAIL: Test 14");
    console.log("Expected:", testCase7Out.Results.length);
    console.log("Received:", testCase7Result.Results.length);
}


/*
Test Case 8: Lines with the search term inside of another word should not be returned
Input: search term "dog" with 1 book and 2 lines scanned
Expected Output: Book 1 line 1
*/
const testCase8In = [
    {
        "Title": "Book 1",
        "ISBN": "1234",
        "Content": [
            {
                "Page": 100,
                "Line": 1,
                "Text": "the dog"
            },
            {
                "Page": 100,
                "Line": 1,
                "Text": "the dogdog the"
            },
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
        }
    ]
}

const testCase8Result = findSearchTermInBooks(testCase8Term, testCase8In);
if (JSON.stringify(testCase8Out) === JSON.stringify(testCase8Result)) {
    console.log("PASS: Test 15");
} else {
    console.log("FAIL: Test 15");
    console.log("Expected:", testCase8Out);
    console.log("Received:", testCase8Result);
}
if (testCase8Result.Results.length == testCase8Out.Results.length) {
    console.log("PASS: Test 16");
} else {
    console.log("FAIL: Test 16");
    console.log("Expected:", testCase8Out.Results.length);
    console.log("Received:", testCase8Result.Results.length);
}


