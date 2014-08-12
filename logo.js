// Copyright 2014 Bowery, Inc.

var numberOfPoints = 19

var container, mouse, camera, controls, scene, renderer

init()
animate()

function init() {
  mouse = new THREE.Vector2()

  container = document.createElement('div')
  document.body.appendChild(container)

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
  camera.position.y = 400
  camera.position.z = 800

  controls = new THREE.TrackballControls(camera)
  controls.rotateSpeed = 1.0
  controls.zoomSpped = 1.2
  controls.panSpeed = 0.8
  controls.noZoom = false
  controls.noPan = false
  controls.staticMoving = true
  controls.dynamicDampingFactor = 0.3

  scene = new THREE.Scene()

  var object, materials = [
    new THREE.MeshLambertMaterial({
      color: new THREE.Color(0, 0, 0),
      shading: THREE.noShading,
      fog: false
    }),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      wireframeLinewidth: 2,
      transparent: false,
      opacity: 1
    })
  ]

  points = []
  for (var i = 0; i < numberOfPoints; i++)
    points.push(randomPointInSphere(50))

  var geo = new THREE.ConvexGeometry(points)
  object = THREE.SceneUtils.createMultiMaterialObject(geo, materials)
  object.position.set(-200, 0, 200)
  scene.add(object)


  renderer = new THREE.WebGLRenderer({antialias: true})
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.sortObjects = false

  container.appendChild(renderer.domElement)

  window.addEventListener('resize', onWindowResize, false)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function randomPointInSphere(radius) {
  return new THREE.Vector3((Math.random() - 0.5) * 2 * radius, (Math.random() - 0.5) * 2 * radius, (Math.random() - 0.5) * 2 * radius)
}

function animate() {
  requestAnimationFrame(animate)
  render()
}

function render() {
  controls.update()
  camera.lookAt(scene.position)
  renderer.render(scene, camera)
}
