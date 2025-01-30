# Objects
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
- itemType: number
- count: number

# Endpoints
## Survivors
### Find one: `/survivors/find`
Get one survivor by ID.

#### Params (URL)
- id: number

#### Returns
Survivor object.

### Create: `/survivors/create`
Create survivor.

#### Params (body)
Survivor object.

### List: `/survivors/list`
List all survivors.

#### Returns
Array of survivor objects.

### Report Infection: `/survivors/report`
Report an infection for a survivor.

#### Params (body)
InfectionReport object

### Update: `/survivors/update`
Update survivor.

#### Params (body)
Partial survivor object. ID required.