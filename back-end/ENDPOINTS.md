# Objects
### Survivor
- id: number
- name: string
- age: number
- gender: 0|1 (M/F)
- latitude: string
- longitude: string

### Infection Report
- reported: number (Survivor ID)
- reporter: number (Survivor ID)

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

### Create: `/survivors/report`
Report an infection for a survivor.

#### Params (body)
Infection Report object