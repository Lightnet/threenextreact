# status:
  Current broken as rework the naming and meaning for the api for save and load data from server request.


## Dev urls:
- http://localhost:3000/editor ( main / work in progress )
- http://localhost:3000/examples (tests)
- http://localhost:3000/app (tests / not added any feature yet.)
- http://localhost:3000/ (entry point home page)
- http://localhost:5555/ database (not in used)

## TO DO LIST:
- account / auth (added / partly working)
  - auth (simple user and password)
  - sign up (added / need work)
  - third partly sign token (not build)

- UI
  - button (work in progress)
  - input (work in progress)
  - window (work in progress)
  - modal (work in progress)
  - sidebar (work in progress)
  - 

- Assets:
  - upload file types (work in progress)
  - save to database as base64 string
  - delete (not added)
  - file limit size check? (not added)
  - check file type (not added)
  - update ?
  
- load image (testing)
  - png (tested)

- project work space
  - list (added)
  - update/edit (added)
  - delete (added)
    - sub folders (not build)

- editor
  - auto save and load when user interact with the object3D  
  - save (added) 
    - database  (partly working)
  - load (added ) 
    - database (partly working)
  - shape / object type
    - box (added)
    - circle (added)
    - cone (added)
    - point light (added)
    - camera (added)
    - plane (added)
    - sphere (not build)
  - orbit camera ( added / work in progres )

  - prop view panel (work in progress)
    - scene (added)
    - scenes (added)
    - object props (added)
    - object3ds (added)
    - objectdatas (added)

  - object3d
    - database save and load (partly working)
    - create object (add base secene id)
    - delete object (add base secene id)
    - update object (add base secene id)
    - move another scene  (not build)
    - prefab (not added / need parent code script id and tags)
    - delete save object3d if accident remove from scene.

  - scene panel
    - database save and load (partly working)
    - object3d list (added )
    - object3d delete (added)
    - object3d rename (not added / random name)
    - object3d select ( added )
    - object3d list update (added)
    - object3d visiable ( added )
    
  - (view/scenes)
    - create (added)
    - edit (added)
    - delete (added)
    
  - props
    - position ( added )
    - rotation ( added )
      - radian / degree (added)
    - scale ( added )

  - material  (not build)
    - create
    - update
    - delete

  - texture  (not build)
    - create
    - update
    - delete

  - model  (not build)
    - create
    - update
    - delete

  - animation  (not build)
    - create
    - update
    - delete

  - prefab entity  (not build)
    - create
    - update
    - delete
  
  - physics (work in progress)
    - plane (added)
    - box (added)
    - sphere (not added)
    - cylinder (not added)

- debug (work in progress)
  -  simple physics test

- game (not build)
  - delete  (not build)
  - load  (not build)
  - save  (not build)
  - config  (not build)