08.05.2024
BIG REFACTOR DONE
THIS TEXT IS OBSOLETE!

# COMPONENTS DOCUMENTATION 📚

## ABOUT THE PACKAGE 🔍

All my react components.
More info about the package goes here...

**All categories**

-   Selectors

$\mathfrak{\color{lime}{to \ do }}$

## ALL COMPONENTS ⚙

### 📌 SELECTORS:

#### `DropdownMenusByLevel(props)`

**Info**

-   Component used to render an object in a dropdown menu scheme, with the possibility to select inputs and return them to parent component (important: use this returned array for global state like Redux or variables, not to update parent component state - this will cause a re-render)
-   The dropdowns menus can be opened and closed, and the selected inputs inside will change color on click by user
-   Personalized styles can be passed as argument, as well as a personalized function to handle selected inputs data
-   The component will loop through an object creating an obj-kinda-ui: any key will become a category (level) to open, then it loops any nested object value the same way, untill we meet an array of simple values (like strings), those will be rendered as inputs to select
-   There is no limit for nesting objects inside other objects

**Imports**

-   useEffect, useState
-   Error, component used to render errors
-   standardStyles (used if user doesn't pass any styling)

**Props**

-   `obj`: Required. Must be an object, it can contain as many nested object as desired, but the end values must be array of values.
-   `styles`: Not required. CSS styles to pass to the component. Check classname through Inspect View in browser or in component file.
-   `handleChildState()`: Not required. Function to handle selected input by user from the parent component. (important: use the returned array for dispatch to global state like Redux or for simple variables and functions, updating the parent component state will cause a re-render)
-   `filters`: Not required. Array of strings. If exists, use it to setFilters state on component render.

**State**

-   `error`: store error message before and during render. If exists, render `ErrorComponent({ error, styles })` instead of component
-   `dropdownMenus`: on render is empty obj, after parsing `props.obj` get a new key for every layer. ex: _{1:[], 2:[], ...}_
-   `renderReady`: if true, render component. We need to parse dropdownsMenus first to prevent infinite loop, if done after or during render
-   `filters`: on render is empty array, here we store all the values selected in the UI, we also pass this back to parent through `props.handleChildState()`
-   `styles`: is an object containing the css for the component, chooses `props.styles` if exists, else uses `component standardStyles`

**useEffect's**

-   on render: we check if any `props` contain any error or missing argument that are required. If so we invoke `setError(str)`, else we run `getMenusState()`. This will parse the `props.obj` for `setDropdownMenus` before to start rendering the component.
-   on `filters` changes: invoke `props.handleChildState(filters)` to comunicate to the parent component any changes made by the user in `filters`. Also checks if `props.handleChildState()` is a function.

**Functions**

-   `loopObject(object)`: receives an obj and loop over the entries _[[key, values], ...]_
-   `checkEntries(array, level)`: receives `array` of entries: _[[key, values], ...]_ , `level` is an integer used to store the actual object level of the object we are in. Map the `array`. With any of this elements invokes `renderCategory(values, key, level)`.
-   `renderValues(array, key)`: used to render end values of the nested objects from `props.obj`. Receives an `array` of values, a `key` (the name of the parent category, we need it for setting uniques keys in map). After map on `array` it checks for errors first, then checks if value is already in `filters`, if so we return the "remove" action input, else the "add" action input.
-   `renderCategory(values, key, level)`: Used to render `props.obj` keys and invoke `checkEntries()` or `renderValues()` if `values` is an object or an array. Receives also a `key` (the name of the parent category, we need it for setting uniques keys in map). `level` is an integer used to store the actual object level of the object we are in. If `values` is an array render `key` category and invoke `renderValues(values, key)` if this category has been open by user: `dropdownMenus[level][key]`. If `values` is an object invoke first `loopObject(values)` to loop it, then invoke `checkEntries(objectEntries, Number(level) + 1)` on it, we also pass `Number(level) + 1` because we are going one level deeper inside the object; Through this, the function is invoking itself untill conditions are fulfilled. Anyway after this we render the result if category has been open by user: `dropdownMenus[level][key]`.
-   `renderAllData(object)`: this function receive the all argument `props.obj` and start the whole render, when invoked after setting `dropdownMenus` state first. First invoke `loopObject(object)` then returns `checkEntries(objectEntries, 1)`.
-   `getMenusState()`: Function used to start the parse of `props.obj` for setting `dropdownMenus` state later on. Infinite loop if called after render. It loop and set the actual level of the object, taking all keys and setting their values to false, meanwhile it filters the values and check their type, if val is an object it invokes `getSubMenusState(val, 2, stateObj)` on it. It also creates and passes down `stateObj`, that is what we will pass to `setDropdownMenus` at the end of the process - later! - not now. In the end, it calls `setRenderReady(true)`, allowing render to start. Now component can render without infinite loop.
-   `getSubMenusState(values, level, state)`: This function is very similar to `getMenusState()`. Main differences are that this the function is invoking itself untill conditions are fulfilled (no nested objects left!). Then it will `setDropdownMenus(stateObj)`.
-   `updateFilters(val, action, topic)`: Function use onClick for the inputs, depending on `action` it will add or remove the value for the array `filters` and update its state. `topic` not in use now.
-   `checkCategoryValues(val, key)`: checks if value is object or array type. If array, loop it and check values inside to be strings only. Else returns error.

**Render**

-   if `error` exists render `ErrorComponent({ error, props.styles })`
-   if `renderReady` is false render _Loading..._ string
-   else invoke `renderAllData(props.obj)` that renders component

###### To test

-   what if `props.obj` value is not obj or arr ✔
-   what if values in arrays are object like _{name: "aaa", id: 3}_ ✔
-   check if any missing argument breaks the component ✔
-   check if any wrong type argument breaks the component ✔
-   in real App environment: `filters` se giá settato in precedenza, tipo in redux, si resetta on component re-render. Es: se esco da Shop ci stá il reset forse, ma se cambio solo ui in Shop e poi riapro dovrebbe rimanere settato.
-   add length of categories in UI ✔
-   use some preset css if `props.styles` is missing ✔

$\mathfrak{\color{lime}{to \ do }}$

08.05.2024
BIG REFACTOR DONE
THIS TEXT IS OBSOLETE!
