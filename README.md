# SpecTacular
### No more pen-on-paper spec tests.
---

# Testing
+ 1 mark per menu item. All questions about the drink must be answered correctly to gain the mark.
+ All components are multiple choice apart from quantity questions.
+ The tests are untimed.
+ Floor tests only test for ingredients, glass, garnish and history.

# For Managers
relys on the <file> interface so
+ you have to select a menu from a popup to take a test, edit or create
+ its recomended you use the empty **SpecTacular/Menus** folder when you download menus
+ when you create a menu, remember its password
  
---
- ## Creating a Menu
1. Open the SpecTacular folder
2. Open **MenuManager.html** - with a double click
3. Click the **Create Menu** button
4. Enter your desired passcode and filename and press submit
5. Use the Add Section Cocktail buttons, providing inputs when prompted
6. When the menu is finished, press the final Sumbit button and the menu will download
7. Place the menu in the **SpecTacular/Menus** directory

- ## Taking a Test
1. Open the SpecTacular folder
3. Open **specTacular.html** - with a double click
4. Click the **Bar Test** or **Floor Test** button.
5. Select your **filename.menu** Menu file. Use the **SpecTacular/Menus** directory to store these files.
6. Fill in the empty sections and sumbit the test
7. Record the final score.

- ## Editing a Test
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
