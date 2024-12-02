from pythreejs import *
from ipywidgets import widgets

# Set up the scene
scene = Scene()

# Add lights to the scene
scene.add(AmbientLight(color='#ffffff', intensity=0.5))
scene.add(DirectionalLight(position=[3, 3, 3], intensity=1))

# Load a model (you need a GLTF file)
gltf_loader = GLTFLoader()
gltf_model = gltf_loader.load('policeLogo.glb')

# Add the model to the scene
scene.add(gltf_model)

# Set up the camera
camera = PerspectiveCamera(position=[0, 1, 5], lookAt=[0, 0, 0])

# Set up the renderer
renderer = WebGLRenderer(camera=camera, scene=scene, width=800, height=600)
display(renderer)
