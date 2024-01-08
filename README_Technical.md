# V1.0 - Technical

## Considerations
1. Testing is in office and invigilated
2. Working from the outside - cant ensure hosting using web technologies - CORS & local filesystem acess
3. Offline marking process - Security & Storing answers
4. Should be straight forward to take, in design and content
    - removing the spelling aspect of pen and paper, and such inferences required by marker. Testing cocktail specs alone.
5. The answers should not be acessable, for bartenders or by public repository

## Solution - HTML/CS/JS + Python Webserver.
1. Web pages acessible on office machine web browsers, localhost permissions to be tested on in-person.
2. Not a web application, localhost to bypass CORS.
    - SCORES MUST BE RECORED MANUALLY BEFORE TERMINATION.
    - web technologies used can be re-impliemented as web application.
3. No plaintext answers, use encryption/deryption
    - decrypted answers never given gloabl scope
    - decryption by acess key
4. Web Techs enable formatting, styling and scripting.
    - Minimilist design
    - Auto-filtered ingredient searchbox
5. Client side security conserns are mittigated by invigilation.
    - protection from browser debugging

## resources/answers.json
Menus are handled as JSON objects, this file will be encrypted when sumbiting the acess code "ENCRYPT". The structure is defined as follows 

```
Menu            -> {"Section_Name": Section_Array}
Section_Array   -> ["Cocktail_Name": Cocktail, ...]
Cocktail        -> {
                        "name": String,
                        "ingredients": 
                        {
                            "ingredient": Integer,
                            ...
                        },
                        "glass": String,
                        "ice": String,
                        "garnish": [String, ...],
                        "method": String
                    }
``````

## scripts/auth/crypto/encrypt.js
This Script encrypts **resources/answers.json** with an acess key, you will need to note the key to take the test. It will download a new **encrypted_answers.txt** file To set an new key update, 
```
const _PASSPHRASE = "MY NEW KEY"
```
or change the name of the output test
```
const _EN_FNAME = "new_encrypted_answers.txt"
```
or change the expected asnwer file, default - **resource/answers.json**
```
const _PT_FPATH = "answers.json"
```

## scripts/auth/crypto/decrypt.js
This Script decrypts **resources/encrypted_answers.txt** with an acess key, you will need to note the key to take the test. To change the expected file name, 
```
const _FPATH = 'encrypted_answers.txt';
```