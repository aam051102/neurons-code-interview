# Definitions
### Survivor
- id: number
- name: string
- age: number
- gender: 0|1 (M/F)
- latitude: string
- longitude: string
- inventory: InventoryItem[]
- receivedReports: InfectionReport[]
- sentReports: InfectionReport[]

### InfectionReport
- reported: number (Survivor ID)
- reporter: number (Survivor ID)

### InventoryItem
- itemType: number (Must be one of InventoryItemType keys)
- count: number

### InventoryItemType
- 0: Water
- 1: Food
- 2: Medication
- 3: Ammunition

# Endpoints
## Survivors
### Find one: `/survivors/find` (GET)
Get one survivor by ID.

#### Params (URL)
- id: number

#### Returns
Survivor object.

### Create: `/survivors/create` (POST)
Create survivor.

#### Params (body)
Survivor object.

### List: `/survivors/list` (GET)
List all survivors.

#### Returns
Array of survivor objects.

### Report Infection: `/survivors/report` (POST)
Report an infection for a survivor.

#### Params (body)
InfectionReport object

### Update: `/survivors/update` (PATCH)
Update survivor.

#### Params (body)
Partial survivor object. ID required.

### Trade items: `/survivors/trade` (POST)
Trade items of equal value between two survivors

#### Params (body)
- leftId: number (Survivor ID)
- rightId: number (Survivor ID)
- leftInventory: InventoryItem[] (List of items to transfer from left to right)
- rightInventory: InventoryItem[] (List of items to transfer from right to left)