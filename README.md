# SpecTacular
### No more pen-on-paper spec tests.
---

# Testing
+ 1 mark per menu item. All questions about the drink must be answered correctly to gain the mark.
+ All components are multiple choice apart from quantity questions.
+ The tests are untimed.
+ Floor tests do not ask for ingredient quantities.

# For Managers
The application relys on a file interface so
+ you have to select a menu from a popup to take a test, edit or create
+ its recomended you use the empty **SpecTacular/Menus** folder when you download menus
+ when you create a menu, remember its password
+ when you edit a menu, its password is not changed
  
---

- ## Setup
https://github.com/woodwj/SpecTacular/assets/47415807/e034833f-cebc-4889-8144-15eac86d7724
1. Download the release
2. Place the folder on the desktop
3. Extract the folder on the desktop
4. Open the extracted folder

- ## Creating a Menu
https://github.com/woodwj/SpecTacular/assets/47415807/16245fdb-0ace-4ecc-a0f6-ea10edef5142
1. Open the SpecTacular folder
2. Open **MenuManager.html** - with a double click
3. Click the **Create Menu** button
4. Enter your desired passcode and filename and press submit
5. Use the Add Section Cocktail buttons, providing inputs when prompted
6. When the menu is finished, press the final Sumbit button and the menu will download
7. Place the menu in the **SpecTacular/Menus** directory

- ## Taking a Test
https://github.com/woodwj/SpecTacular/assets/47415807/f66bab4b-e5d7-429c-a108-2ea767a730c9
1. Open the SpecTacular folder
3. Open **specTacular.html** - with a double click
4. Click the **Bar Test** or **Floor Test** button.
5. Select your **filename.menu** Menu file. Use the **SpecTacular/Menus** directory to store these files.
6. Fill in the empty sections and sumbit the test
7. Record the final score.

- ## Editing a Test
https://github.com/woodwj/SpecTacular/assets/47415807/e0acd301-009d-4d68-9446-515180d89f86
1. Open the SpecTacular folder
2. Open **MenuManger.html** - with a double click
3. Click the **Edit Test** button
4. Select your **filename.menu** Menu file. Use the **SpecTacular/Menus** directory to store these files
5. Make your changes and sumbit the test
6. A new **.menu** file will be downloaded, move it to the **SpecTacular/Menus** directory

- ## Converting from JSON
You can also use **MenuManger.html** to convert menus from JSON.
Follow the pattern for building menu objects in your own JSON file.

```
Cocktail : {
    name : Str
    ingredients: {Str : Int},
    glass: Str,
    method: Str,
    (Optional) garnish : [Str ...]
    (Optional) history : Str
},

CategoryList : [Cocktail,...],

Menu : {Str: CategoryList, ...}
```

so an example could look like.
```
{
    "Test Section 1":
    [
        {
            "name":"Example",
            "ingredients":
            {
                "Ingredent 1":50,
                "Ingredent 2":5
            },
            "glass":"Required",
            "method":"Required"
        },...
    ],...
}
```
