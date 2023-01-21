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

    var resultList = []

    if(searchTerm != "" && scannedTextObj.length>0){ // checking inputs to see if there are books
        for(var iBook=0; iBook<scannedTextObj.length; iBook++){
            // console.log(resultList.length)
            var book = scannedTextObj[iBook];
            // console.log(book.Title)
            if(book.Content.length >0){ // checking to see if the book has scanned content, go to next book if not
                var isbn = book.ISBN
                for(var iContent=0; iContent<book.Content.length; iContent++){
                    var line = book.Content[iContent].Line;
                    var page = book.Content[iContent].Page;
                    var text = book.Content[iContent].Text;

                    if(text.search(searchTerm) > -1){
                        // MAKE SURE CHARS BEFORE AND AFTER SEARCH TERM ARE NOT OTHER LETTERS (ONLY PUNCTUATION)
                        // console.log(searchTerm+" FOUND in "+text)
                        resultList.push(
                            {
                                "ISBN": isbn,
                                "Page": page,
                                "Line": line
                            }
                        )
                    }
                    else{
                        // console.log(searchTerm+" not found in "+text)
                    }
                }
            }
        }
    }
    // console.log(resultList)
    var result = {
        "SearchTerm": searchTerm,
        "Results": resultList
    };
    
    // console.log(result);
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

const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
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
const testcase2in = []
    
const testcase2out = {
    "SearchTerm": "the",
    "Results": []
}

const testcase2result = findSearchTermInBooks("the", testcase2in);
if (JSON.stringify(testcase2out) === JSON.stringify(testcase2result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", testcase2out);
    console.log("Received:", testcase2result);
}

/** We could choose to check that we get the right number of results. */
if (testcase2result.Results.length == 0) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", testcase2out.Results.length);
    console.log("Received:", testcase2result.Results.length);
}


/*
Test Case 3: No lines scanned should return empty results
Input: "the" and 1 book with empty content
Expected Output: Empty list of results 
*/
const testcase3in = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [] 
    }
]
    
const testcase3out = {
    "SearchTerm": "the",
    "Results": []
}

const testcase3result = findSearchTermInBooks("the", testcase3in);
if (JSON.stringify(testcase3out) === JSON.stringify(testcase3result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", testcase3out);
    console.log("Received:", testcase3result);
}

/** We could choose to check that we get the right number of results. */
if (testcase3result.Results.length == 0) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", testcase3out.Results.length);
    console.log("Received:", testcase3result.Results.length);
}

/*
Test Case 4: No search term in 1 book with 3 lines should return empty results
Input: search term "" with 1 book and 3 lines
Expected Output: line 9 outputted
*/
const testcase4in = [
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
    
const testcase4out = {
    "SearchTerm": "",
    "Results": []
}

const testcase4result = findSearchTermInBooks("", testcase4in);
if (JSON.stringify(testcase4out) === JSON.stringify(testcase4result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", testcase4out);
    console.log("Received:", testcase4result);
}

/** We could choose to check that we get the right number of results. */
if (testcase4result.Results.length == 0) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", testcase4out.Results.length);
    console.log("Received:", testcase4result.Results.length);
}

/*
Test Case 5: Search term with multiple books and multiple lines inputted should return lines with term present
Input: search term "the" with 2 book and 3 lines scanned each
Expected Output: Book 1 line 1, Book 2 line 1,2 outputted
*/
const testcase5in = [
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
                "Text": "I like the dog."
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
    
const testcase5out = {
    "SearchTerm": "the dog",
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

const testcase5result = findSearchTermInBooks("the dog", testcase5in);
if (JSON.stringify(testcase5out) === JSON.stringify(testcase5result)) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", testcase5out);
    console.log("Received:", testcase5result);
}

/** We could choose to check that we get the right number of results. */
if (testcase5result.Results.length == 3) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", testcase5out.Results.length);
    console.log("Received:", testcase5result.Results.length);
}

/*
Test Case 6: Search term and lines including term in different cases should only return lines with the term in the correct case
Input: search term "The dog" with 1 book and 4 lines scanned
Expected Output: Book 1 line 2 outputted
*/
/** Example input object. */
const testcase6in = [
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
                "Text": "The dog eats food"
            },
            {
                "Page": 100,
                "Line": 3,
                "Text": "THE DOG"
            },
            {
                "Page": 100,
                "Line": 4,
                "Text": "this is the Dog"
            } 
        ] 
    },
]
    
/** Example output object */
const testcase6out = {
    "SearchTerm": "the dog",
    "Results": [
        {
            "ISBN": "1234",
            "Page": 100,
            "Line": 1
        },
    ]
}

const testcase6result = findSearchTermInBooks("the dog", testcase6in);
if (JSON.stringify(testcase6out) === JSON.stringify(testcase6result)) {
    console.log("PASS: Test 11");
} else {
    console.log("FAIL: Test 11");
    console.log("Expected:", testcase6out);
    console.log("Received:", testcase6result);
}

/** We could choose to check that we get the right number of results. */
if (testcase6result.Results.length == 3) {
    console.log("PASS: Test 12");
} else {
    console.log("FAIL: Test 12");
    console.log("Expected:", testcase6out.Results.length);
    console.log("Received:", testcase6result.Results.length);
}

/*
Test Case 7: Search term with upper case letter should return lines with only uppercase letter term present
Input: search term "The dog" with 1 book and 4 lines scanned
Expected Output: Book 1 line 2 outputted
*/
/** Example input object. */
const testcase7in = [
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
                "Text": "The dog eats food"
            },
            {
                "Page": 100,
                "Line": 3,
                "Text": "THE DOG"
            },
            {
                "Page": 100,
                "Line": 4,
                "Text": "this is the Dog"
            } 
        ] 
    },
]
    
/** Example output object */
const testcase7out = {
    "SearchTerm": "The dog",
    "Results": [
        {
            "ISBN": "1234",
            "Page": 100,
            "Line": 2
        },
    ]
}

const testcase7result = findSearchTermInBooks("The dog", testcase7in);
if (JSON.stringify(testcase7out) === JSON.stringify(testcase7result)) {
    console.log("PASS: Test 13");
} else {
    console.log("FAIL: Test 13");
    console.log("Expected:", testcase7out);
    console.log("Received:", testcase7result);
}

/** We could choose to check that we get the right number of results. */
if (testcase7result.Results.length == 3) {
    console.log("PASS: Test 14");
} else {
    console.log("FAIL: Test 14");
    console.log("Expected:", testcase7out.Results.length);
    console.log("Received:", testcase7result.Results.length);
}


/*
Test Case 8: Search term with lines including different punctuation and term placements should return correct lines with term present
Input: search term "the dog" with 1 book and 4 lines scanned
Expected Output: Book 1 lines
*/
/** Example input object. */
const testcase8in = [
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
                "Line": 2,
                "Text": "wordsthedog"
            },
            {
                "Page": 100,
                "Line": 3,
                "Text": "words the dog."
            },
            {
                "Page": 100,
                "Line": 4,
                "Text": "-the dog!"
            } ,
            {
                "Page": 100,
                "Line": 5,
                "Text": "wordthe dog"
            },
            {
                "Page": 100,
                "Line": 6,
                "Text": "!the dog"
            },
            {
                "Page": 100,
                "Line": 7,
                "Text": "word-the dog!"
            }, 
            {
                "Page": 100,
                "Line": 8,
                "Text": "word -the dog!"
            } 
        ] 
    },
]
    
/** Example output object */
const testcase8out = {
    "SearchTerm": "the dog",
    "Results": [
        {
            "ISBN": "1234",
            "Page": 100,
            "Line": 1
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
        },
        {
            "ISBN": "1234",
            "Page": 100,
            "Line": 6
        },
        {
            "ISBN": "1234",
            "Page": 100,
            "Line": 8
        },
    ]
}

const testcase8result = findSearchTermInBooks("the dog", testcase8in);
if (JSON.stringify(testcase8out) === JSON.stringify(testcase8result)) {
    console.log("PASS: Test 15");
} else {
    console.log("FAIL: Test 15");
    console.log("Expected:", testcase8out);
    console.log("Received:", testcase8result);
}

/** We could choose to check that we get the right number of results. */
if (testcase8result.Results.length == 3) {
    console.log("PASS: Test 16");
} else {
    console.log("FAIL: Test 16");
    console.log("Expected:", testcase8out.Results.length);
    console.log("Received:", testcase8result.Results.length);
}


