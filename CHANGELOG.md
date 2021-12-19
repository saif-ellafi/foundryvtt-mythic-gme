### 2.2.2
* Enhancement: All chat messages have now consistent flavor subtitle
* Fixed: Missing 3D Dice rolls on various random event triggers
* Fixed: Various formatting event chat messages were corrected
* Fixed: Format consistency when exporting to Journal and logging automatically

### 2.2.1
* Fixed: Some decks of cards would not be found if not imported
* Fixed: Typo in the SciFi MGA deck was corrected

### 2.2.0
* Feature: New Macro "Oracle Builder" lets you create your own Oracles using random tables and flavor! (Thank you klaas1979 for the discussion ideas!)

### 2.1.0
* Feature: New Macro "Export Chat to Journal" allows dumping current chat to a Journal Entry
* Feature: New Setting "Automatic Adventure Logging" enables automatic log of all Mythic events to a Journal Entry (per calendar day)
* Feature: New Setting "Show Dice Roll Details" allows for toggle of showing the dice roll values (flavor)
* Enhancement: Decks settings now uses a file picker to point to directory
* Fixed: Set default Chaos Rank to 4 when accepting the switch to V2 Chaos Range
* Fixed: A few typos and styling issues

### 2.0.1
* Fixed: Resolved an issue in the first roll of behavior checks leading to incorrect behavior rank
* Fixed: Added missing Disposition shift chat when re-rolling behavior check on the same token
* Fixed: Added missing Privacy Roll consideration for behavior check
* Fixed: Added dash when behavior descriptors are empty in behavior checks 

### 2.0.0
* Feature: Mythic GME Variations #2 Support!!!
* Feature: Advanced Behavior Check Macro
* Feature: Advanced Statistics Check Macro
* Feature: Advanced Details Check Macro
* Feature: Variations #2 Tables Included
* Feature: Privacy for group play, Macros will follow GMs dice roll privacy setting
* Enhancement: 3D Dice if enabled will play with tons more of tension!
* Enhancement: Many more Macros now interact with selected tokens for flavor!
* Enhancement: Improved settings and configuration
* Enhancement: Backstory Check now can take fixed amount of backstories to generate
* Enhancement: Overall Flavor and event descriptions in Chat have improved formatting
* Fixed: All Random Tables are now set to privately roll by default when rolled manually
* Fixed: Improved waiting events for 3D dice to finish (if enabled)
* Fixed: Only available Chaos Ranks are shown in macro dropdowns
* Compatibility: Major internal code overhaul should improve overall behavior
* Documentation: Revamped README

### 1.6.0
* Feature: Variations #1 Background Stories Generator (V1 is now feature complete)
* Feature: Reorganized Macros and Tables to separate Core GME from V1 and V2 variations content
* Feature: 'Slow Simulation of Random Events' builds up tension by slowly rolling random events. Customizable speed.
* Feature: Description and Actions random tables are now available to prepare for Variations #2
* Fixed: Random Events Macro focus now gives priority to imported tables over default ones (to allow user overrides)
* Fixed: Scene Alteration now waits for 3D dice (if enabled) to roll before telling the answer
* Fixed: Doubles Event now waits for 3D dice (if enabled) to roll before telling the answer
* Compatibility: Support for the upcoming Foundry V9

### 1.5.1
* Fixed a typo in GMA SciFi cards file names

### 1.5.0
* Chaos Factor range can be now configured (Variations #1 Theme Settings)
* Random Events may take a predefined Event Focus (Variations #1 Theme Settings)
* Configuration allows Doubles to ignore Chaos Factor for Random Events (Variations #1)
* Fixed typo in module causing a warning in the console on launch

### 1.4.3
* Improved Formatted Message macro so user can choose Speaker of the message among tokens

### 1.4.2
* Added new macro "Formatted Message" allows for formatting Chat style with formats (title, subtitle, bold) and color
* Fixed a redundant entry in compendium packs

### 1.4.1
* Added an optional setting that enables 3D dice on d100 table rolls

### 1.4.0
* Fate and Complex Questions are now sent from a character if a token is selected for Flavor 
* Random Events now take optional user prompt to add flavor (i.e. why is the event for)
* When using the Deck macros and cards are not found, a helpful error message is shown
* Fixed a few wrong chat labels here and there

### 1.3.2
* Minor changes in README, LICENSE and internal building files

### 1.3.1
* Macro Dialogs now automatically focus keyboard on input for faster writing
* Macro Dialogs roll dice when pressing Enter instead of refreshing Foundry

### 1.3.0
* Support for Deck of Cards (Mythic, GMA) thanks to spacegiant
* Minor corrections in code consistency

### 1.2.0
* Fixed selection of V1 Table Themes in Settings
* Improved Settings to show a list of available Tables to roll from
* Improved Table detection code
* Updated LICENSE.md

### 1.1.0
* Included Tables from Focus Mythic Variations #1
* Included Complex Questions from Mythic Variations #1
* Refactored macros to reuse code that can be maintained in future versions

### 1.0.0
* Initial Release